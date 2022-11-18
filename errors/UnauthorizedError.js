const { constants } = require('http2');
// const HTTPError = require('./HTTPError');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
