const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

// initiate socket.io and attach this to the http server
const io = socketIo(server);

app.use(express.static("public"));
