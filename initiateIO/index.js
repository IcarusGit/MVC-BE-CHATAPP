var cors = require('cors')
const express = require('express')
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");


const httpServer = createServer(app);
const io = new Server(httpServer , {
    cors: {
        origin: "*"
    }
});

module.exports = { cors, express, app, createServer, Server, httpServer, io }