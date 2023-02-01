const { ErrorHandler } = require('../helpers/errorHandler');
const { logger } = require('../utils/logger');

const models = require('../models');

const Members = models.members;

async function create(member) {
  try {
    return await Members.create(member);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
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
