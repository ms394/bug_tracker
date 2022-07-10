class ApiError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }

  static badRequest(msg) {
    return new ApiError(msg, 400);
  }

  static resourceNotFound(msg) {
    return new ApiError(msg, 404);
  }

  static internalServerError(msg) {
    return new ApiError(msg, 500);
  }

  static notFound(msg) {
    return new ApiError(msg, 404);
  }
}

module.exports = ApiError;
