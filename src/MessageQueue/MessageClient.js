'use strict';

const io = require('socket.io-client');

class MessageClient
{
  constructor(clientId, url = 'http://localhost:3002/caps')
  {
    this.clientId = clientId;
    this.socket = io.connect(url);
  }

  subscribe(event, handler)
  {
    this.socket.emit('join', { clientId: this.clientId });
    this.socket.on(event, handler);
  }

  publish(event, payload = {})
  {
    this.socket.emit(event, {

      body: payload,
      client: this.clientId,
    });
  }
}


module.export = MessageClient;
