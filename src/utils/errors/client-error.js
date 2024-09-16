const AppError = require("./error-handler");

class ClientError extends AppError {
  constructor(name = "Client Error", message, explanation, statusCode) {
    super(name, message, explanation, statusCode);
  }
}

module.exports = ClientError;
