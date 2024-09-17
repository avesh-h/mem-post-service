const AppError = require("../utils/errors/error-handler");
const { INTERNAL_SERVER_ERROR } = require("../utils/httpStatusCode");

const globalErrorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      explanation: err.explanation,
    });
  }

  //For the generic error
  return res.status(INTERNAL_SERVER_ERROR).json({
    name: "Internal Server Error",
    message: "An unexpected error occured!",
    explanation: err.message,
  });
};

module.exports = globalErrorMiddleware;
