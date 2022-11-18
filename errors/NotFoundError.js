const { constants } = require('http2');
// const HTTPError = require('./HTTPError');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
