class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = 'error';
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  ErrorHandler,
};
