var cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");


app.use(cors())
app.use(express.json())
app.use(cookieParser())

const httpServer = createServer(app);
const io = new Server(httpServer , {
    cors: {
        origin: "*"
    }
});

module.exports = { cors, express, app, createServer, Server, httpServer, io }