'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const handleDriver = require('./handleDriver.js');


// const URL = process.env.CAPS_URL || 'http://localhost:3002/caps';
const URL = 'http://localhost:3002/caps';
const socket = io.connect(URL);

socket.on('join', (payload) => {
  console.log(payload);
  socket.emit('join', payload);
  socket.emit('ready', payload);
});



socket.on('pick-up', handleDriver(socket));
socket.on('in-transit', handleDriver(socket));
