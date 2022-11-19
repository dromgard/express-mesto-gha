const { constants } = require('http2');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
    console.log('UnauthorizedError', this.statusCode);
  }
}

module.exports = UnauthorizedError;
