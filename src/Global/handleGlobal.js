'use strict';

require('dotenv').config();
const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const eventPool = require('../eventPool.js');
const MessageQueue = require('../MessageQueue/MessageQueue.js');
const outGoingQueue = new MessageQueue();



const server = io(PORT);
const global = server.of('/caps'); // clients connect at http://localhost:3002/caps

//// global.on('ready' (payload));

global.on('connection', (socket) => {
  // console.log('User connected!');
  socket.on('join', (payload) => {
    console.log(payload);
    socket.join(payload.orderID);
    console.log(`Welcome to room : ${payload.orderID}`);
    global.to(payload.orderID).emit('Welcome');



  });

  // socket.on('disconnecting', () => {
  //   console.log(socket.rooms); // the Set contains at least the socket ID
  // });

  // socket.on('disconnect', () => {
  //   // socket.rooms.size === 0
  // });

  console.log('User connected!');

  // logs every event in the event pool
  eventPool.forEach(event => {
    socket.on(event, (payload) => {
      console.log('EVENT', payload);
    });
  });

  socket.on('pick-up', (payload) => socket.broadcast.emit('pick-up', payload));
  socket.on('in-transit', (payload) => socket.broadcast.emit('in-transit', payload));
  socket.on('delivered', (payload) => socket.broadcast.emit('delivered', payload));
  socket.on('ready', (payload) => socket.broadcast.emit('ready', payload));
  socket.on('ready2', (payload) => socket.broadcast.emit('ready2', payload));
  socket.on('join', (payload) => socket.broadcast.emit('join', payload));
  socket.on('getAll', (payload) =>
  {
    outGoingQueue.get(payload.clientId).forEach(message => {
      socket.emit('message', message);
    });
  });
});

module.exports = global;
