const { constants } = require('http2');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    console.log('ServerError', this.statusCode);
  }
}

module.exports = ServerError;
