const pino = require('pino');
const pretty = require('pino-pretty');
const expressPino = require('express-pino-logger');

const stream = pretty({
  colorize: true,
});

const logger = pino(
  {
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'silent',
  },
  stream,
);

const logRequest = expressPino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
  },
});

module.exports = { logger, logRequest };
