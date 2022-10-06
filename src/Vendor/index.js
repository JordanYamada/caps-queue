'use strict';

const { datetime1 } = require('../Date/handleDate.js');

require('dotenv').config();
const io = require('socket.io-client');
const handleVendor = require('./handleVendor.js');
const { payload, chance } = require('./chance.js');

// const URL = 'http://localhost:3002/caps';
const URL = process.env.CAPS_URL || 'http://localhost:3002/caps';
const socket = io.connect(URL);
console.log(payload);


setInterval(() => {
  payload.orderID = chance.guid();
  payload.customer = chance.name();
  payload.address = chance.address();
  socket.emit('join', payload);
}, 30000);

socket.on('ready', (payload)=>{
  socket.emit('pick-up',{
    event: 'pick-up',
    time: datetime1,
    payload: payload,
  });
});

socket.on('ready2', (payload)=>{
  socket.emit('in-transit',payload);
});

socket.on('delivered', handleVendor(socket));
