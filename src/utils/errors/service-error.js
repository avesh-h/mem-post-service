const httpStatusCode = require("../httpStatusCode");
const AppError = require("./error-handler");

class ServiceError extends AppError {
  constructor(
    name = "ServiceError",
    message = "Something went wrong!",
    explanation = "Service Layer error",
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = ServiceError;
