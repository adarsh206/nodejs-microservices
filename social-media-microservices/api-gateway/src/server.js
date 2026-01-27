require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const logger = require("./utils/logger");


const app = express();
const PORT = process.env.PORT || 3000;


const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());  // uses for security headers
app.use(cors());
app.use(express.json());

//rate limiting
const ratelimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many requests" });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});


app.use(ratelimit);

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${req.body}`);
  next();
});

// api-gateway -> /v1/auth/register  -> 3000 -> redirect from here to identity services via proxy
// identity-services -> api/auth/register -> 3001
// final api -> localhost:3000/v1/auth/register -> localhost:3001/api/auth/register