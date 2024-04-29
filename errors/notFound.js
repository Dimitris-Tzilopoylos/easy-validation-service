class NotFound extends Error {
  constructor(message = "Not Found") {
    super();
    this.name = "Not Found";
    this.message = message;
    this.status = 404;
    this.stack = new Error().stack;
  }
}

module.exports = NotFound;
