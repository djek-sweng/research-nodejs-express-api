'use strict';

const { Server } = require('socket.io');

const { InternalServerError } = require('./errors');

let io;

const getIO = () => {
  if (!io) {
    throw InternalServerError(null, 'WS not initialized');
  }

  return io;
};

module.exports.init = (httpServer) => {
  io = new Server(httpServer, {
    /** https://socket.io/docs/v4/handling-cors/ */
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });

  return io;
};

module.exports.enable = () => {
  io.on('connection', (socket) => {
    console.log(`client socket ${socket.id} connected`);

    socket.on('disconnect', (reason) => {
      console.log(`client socket ${socket.id} disconnected (${reason})`);
    });
  });
};

module.exports.emit = (ev, ...args) => {
  return getIO().emit(ev, args);
};
