const httpStatusCode = require("../httpStatusCode");

class AppError extends Error {
  constructor(
    name = "App Error",
    message = "Something went wrong!",
    explanation = "Something went wrong!",
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
