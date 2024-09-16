const AppError = require("./error-handler");
const httpStatusCode = require("../httpStatusCode");

class ValidationError extends AppError {
  constructor(error) {
    // We need explanation from the original error object
    let message =
      error.message || "Not able to validate the data sent in the request!";
    let explanation = error.explanation || error.message;
    let errorName = error.name || "ValidationError";
    super();
    this.message = message;
    this.explanation = explanation;
    this.name = errorName;
    this.statusCode = error.statusCode || httpStatusCode.BAD_REQUEST;
  }
}

module.exports = ValidationError;
