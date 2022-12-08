'use strict';

const Chance = require('chance');
const chance = new Chance();

class MessageQueue {
  constructor() {
    this.messages = {};
  }

  add(clientId, payload) {
    let messageId = chance.guid();
    try {
      if (this.messages[clientId]) {
        this.messages[clientId][messageId] = payload;
      }
      else {
        this.messages[clientId] = { messageId: payload };
      }
      return messageId;
    } catch (e) {
      throw new Error('error adding message: ', e);
    }
  }

  get(clientId) {
    try {
      return Object.keys(this.messages[clientId]).map(messageId => ({
        messageId,
        payload: this.messages[clientId][messageId],
      }));
    } catch (e) {
      console.log(e);
      throw new Error('problem getting messages', e);
    }
  }

  read(clientId, messageId) {
    try {
      if (this.message[clientId]) {
        delete this.messages[clientId][messageId];
        return {
          status: 'received',
          messageId,
        };
      }
    } catch (e) {
      console.log(e);
      throw new Error('problem deleting message', e);
    }
  }
}

module.exports = MessageQueue;
