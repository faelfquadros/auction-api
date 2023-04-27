/* eslint-disable import/no-extraneous-dependencies */
import winston from "winston";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.printf((information) => {
    const info = information;
    const loggerString = `${info.timestamp} | ${info.level} | ${info.message}`;

    return info.stack ? `${loggerString} | ${info.stack}` : loggerString;
  })
);

const transports = [new winston.transports.Console()];

winston.addColors(colors);

const logger = winston.createLogger({
  format,
  level: "debug",
  levels,
  transports,
});

export { logger };
