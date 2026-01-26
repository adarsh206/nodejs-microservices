
require('dotenv').config();
const mongoose = require('mongoose');
const logger = require("./utils/logger");
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');;
const Redis = require("ioredis");


const app = express();
const PORT = process.env.PORT || 3001;

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((e) => logger.error("Mongo connection error", e));


// redis connection
const redisClient = new Redis(process.env.REDIS_URL);


// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Received body, ${req.body}`);
    next();
})


//DDos protection and rate limiting






app.listen(PORT, () => {
  logger.info(`Identity service running on port ${PORT}`);
});