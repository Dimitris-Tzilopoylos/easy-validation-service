class Forbidden extends Error {
  constructor(message = "Forbidden") {
    super();
    this.name = "Forbidden";
    this.message = message;
    this.status = 403;
    this.stack = new Error().stack;
  }
}

module.exports = Forbidden;
