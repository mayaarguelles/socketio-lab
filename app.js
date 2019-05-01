const express = require('express');
const path = require('path');
const app = express();

let racerPosTop = 0;
let racerPosBot = 0;

let connectedUsers = 0;

app.use(express.static(path.join(__dirname, 'public')));

const server = require('http').Server(app);

// mount our socket io server
// gives us the io object that represents the Server
const io = require('socket.io')(server);

// io.emit = sent to everybody
// socket.emit = sent to connected client
// socket.broadcast.emit = sends to everyone but the connected client

// listen for stuff -- emit to send and on listens
io.on('connect', (socket) => {
  // socket represents connected client
  console.log('connected:', socket.id);
  socket.emit('populate', {
    racerPosTop,
    racerPosBot
  });

  connectedUsers++;
  io.emit('connectionChange', connectedUsers);

  socket.on('disconnect', (s) => {
    connectedUsers--;
    io.emit('connectionChange', connectedUsers);
  });

  socket.on('moveTop', (s) => {
    console.log("Top racer moved");
    racerPosTop+=5;

    if ( racerPosTop >= 100 ) {
      io.emit('win', 'Devil');
    }

    io.emit('populate', {
      racerPosTop,
      racerPosBot
    });
  });

  socket.on('moveBot', (s) => {
    console.log("Bottom racer moved");
    racerPosBot+= 5;

    if ( racerPosBot >= 100 ) {
      io.emit('win', 'Angel');
    }

    io.emit('populate', {
      racerPosTop,
      racerPosBot
    });
  })
});

// dont listen with express app, do it with server instead
//app.listen(3000);
server.listen(3000);
