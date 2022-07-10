const { createLogger, transports, format } = require("winston");
const { timestamp, errors, colorize, printf, combine, json } = format;

const customFormat = printf(({ level, timestamp, message, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const prodLogger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new transports.Console()],
});

module.exports = prodLogger;
