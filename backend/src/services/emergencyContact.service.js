const { logger } = require('../utils/logger');

const models = require('../models');

const EmergencyContacts = models.emergencyContacts;

async function create(emergencyContact) {
  const emergencyContactEntries = Object.entries(emergencyContact);

  emergencyContactEntries.forEach((entry) => {
    if (entry[1].length === 0) {
      throw new Error(`${entry[0]} cannot be empty`);
    }
  });

  try {
    return await EmergencyContacts.create(emergencyContact);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

module.exports = { create };
