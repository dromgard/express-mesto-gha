const { constants } = require('http2');
// const HTTPError = require('./HTTPError');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
