const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};
const userNames = {};

io.on('connection', socket => {
   
    socket.emit("yourID", socket.id);
    socket.on("yourUserName", (userName) => {
        if (!users[socket.id]) {
            users[socket.id] = userName;
            io.sockets.emit("allUsers", users);
        }
    });
    
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        console.log("someone is trying to call");
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        console.log("call accpeted dood");
        io.to(data.to).emit('callAccepted', data.signal);
    })
});

server.listen(8000, () => console.log('server is running on port 8000'));