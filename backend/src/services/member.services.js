const { ErrorHandler } = require('../helpers/errorHandler');
const { logger } = require('../utils/logger');

const db = require('../models');

const Members = db.members;

async function create(member) {
  try {
    return await Members.create(member);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorHandler(error.errors.map((e) => e.message));
    } else {
      logger.error(error);
      throw new ErrorHandler(error.message);
    }
  }
}

async function getAll() {
  try {
    return await Members.findAll();
  } catch (error) {
    throw new ErrorHandler(error.message);
  }
}

module.exports = { create, getAll };
