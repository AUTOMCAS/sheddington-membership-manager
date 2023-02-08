const { logger } = require('../utils/logger');

const models = require('../models');

const Members = models.members;

async function create(member) {
  const memberEntries = Object.entries(member);

  memberEntries.forEach((entry) => {
    if (entry[1].length === 0) {
      throw new Error(`${entry[0]} cannot be empty`);
    }
  });

  try {
    return await Members.create(member);
  } catch (error) {
    logger.error(error);
    if (error.errors[0].message === 'email must be unique') {
      throw new Error('Email must be unique');
    }

    throw new Error(error);
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
