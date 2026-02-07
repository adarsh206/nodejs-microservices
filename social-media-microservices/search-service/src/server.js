require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");
const { connectToRabbitMQ, consumeEvent } = require('./utils/rabbitmq');
const searchRoutes = require('./routes/search-routes');
const { handlePostCreated, handlePostDeleted } = require("./eventHandlers/search-event-handlers");



const app = express();
const PORT = process.env.PORT || 3004;

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((e) => logger.error("Mongo connection error", e));


// redis connection
const redisClient = new Redis(process.env.REDIS_URL);


//middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${req.body}`);
  next();
});


// IP based rate limiting for sensitive end points 
const sensitiveEndpointsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,  // it tells whether you want to add rate limit info in response header or not and also show how many request left to fire
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many requests" });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});


// apply this sensitiveEndpointsLimiter to our routes
app.use("/api/search/posts", sensitiveEndpointsLimiter);


app.use('/api/search', searchRoutes);

app.use(errorHandler);

async function startServer(){
    try {
        await connectToRabbitMQ();

        // consume the events / subscribe to the events
        await consumeEvent("post.created", handlePostCreated);
        await consumeEvent("post.deleted", handlePostDeleted);

        app.listen(PORT, () => {
            logger.info(`Search service is running on port : ${PORT}`);
        })
    } catch (error) {
        logger.error(error, "Failed to start search server");
        process.exit(1);
    }
}