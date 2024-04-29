class Unauthorized extends Error {
  constructor(message = "Unauthorized") {
    super();
    this.name = "AuthenticationError";
    this.message = message;
    this.status = 401;
    this.stack = new Error().stack;
  }
}

module.exports = Unauthorized;
