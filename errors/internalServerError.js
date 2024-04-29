class InternalServerError extends Error {
  constructor(message = "Internal Server Error") {
    super();
    this.name = "Internal Server Error";
    this.message = message;
    this.status = 500;
    this.stack = new Error().stack;
  }
}

module.exports = InternalServerError;
