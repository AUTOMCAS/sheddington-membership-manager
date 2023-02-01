const { ErrorHandler } = require('../helpers/errorHandler');
const { logger } = require('../utils/logger');

const models = require('../models');

const Members = models.members;

async function create(member) {
  try {
    return await Members.create(member);
  } catch (error) {
    //logger.error(error);
    //console.log('error.errors', error.errors[0].message);
    throw new Error(error.errors[0].message);
  }
}

async function getAll() {
  try {
    return await Members.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { create, getAll };
