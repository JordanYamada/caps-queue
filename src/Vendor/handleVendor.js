'use strict';


const handleVendor = (socket) => (payload) => {
  console.log('VENDOR: Thank you for delivering e3669048-7313-427b-b6cc-74010ca1f8f0');
  socket.emit('global', payload);
}

module.exports = handleVendor;
