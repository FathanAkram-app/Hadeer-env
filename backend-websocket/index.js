const app = require("express")()
const fs = require('fs')
require('dotenv').config()
const { initSocketConnection } = require('./app/socket_connections');

const port = 3443


const https = require('https');
const server = https.createServer({
  key:fs.readFileSync(__dirname+"/certificate/key.pem"),
  cert:fs.readFileSync(__dirname+"/certificate/cert.pem")
},app);

const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true
  },
});




initSocketConnection(io)
app.listen(port)

