'use strict';

const { datetime2, datetime3 } = require('../Date/handleDate.js');

const handleDriver = (socket) => (payload) => {
  socket.emit('global', payload);
  if (payload.event === 'pick-up') {
    console.log(payload.time);
    payload.time = datetime2;
    payload.event = 'in-transit';
    console.log(`DRIVER: picked up ${payload.payload.orderID}`);
    socket.emit('ready2',payload);
  } else {
    payload.time = datetime3;
    payload.event = 'delivered';
    console.log(`DRIVER: delivered ${payload.payload.orderID}`);
    socket.emit('delivered',payload);
  }
};

module.exports = handleDriver;
