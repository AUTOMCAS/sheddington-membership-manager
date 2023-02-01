const pino = require('pino');
const pretty = require('pino-pretty');

const stream = pretty({
  colorize: true,
});

const logger = pino(
  {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
  stream
);
module.exports = { logger };
