const ApiError = require("./api-error");

const apiErrorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: "Something went wrong." });
};

module.exports = apiErrorHandler;
