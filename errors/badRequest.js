class BadRequest extends Error {
  constructor(message = "Bad Request") {
    super();
    this.name = "Bad Request";
    this.message = message;
    this.status = 400;
    this.stack = new Error().stack;
  }
}

module.exports = BadRequest;
