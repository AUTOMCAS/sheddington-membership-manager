const { logger } = require('../utils/logger');

const models = require('../models');

const EmergencyContacts = models.emergencyContacts;

const create = async (emergencyContact) => {
  try {
    return await EmergencyContacts.create(emergencyContact);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

const deleteById = async (id) => {
  try {
    return await EmergencyContacts.destroy({ where: { id } });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

module.exports = { create, deleteById };
