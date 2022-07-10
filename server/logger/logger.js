const devLogger = require("./dev-logger");
const prodLogger = require("./prod-logger");

let logger = null;

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  logger = devLogger;
} else {
  logger = prodLogger;
}

module.exports = logger;
