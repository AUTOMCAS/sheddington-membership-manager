class ErrorHandler extends Error {
  constructor(message) {
    super();
    this.status = 'error';
    this.message = message;
  }
}

module.exports = {
  ErrorHandler,
};
