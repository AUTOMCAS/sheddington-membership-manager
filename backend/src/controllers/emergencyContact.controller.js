const emergencyContactService = require('../services/emergencyContact.service');
const { logger } = require('../utils/logger');

async function createEmergencyContact(req, res) {
  const emergencyContact = req.body;
  const isEmpty = Object.keys(req.body).length === 0;
  if (isEmpty) return res.status(400).send({ message: 'All fields required' });

  try {
    const createdEmergencyContact = await emergencyContactService.create(
      emergencyContact,
    );
    return res.status(200).json(createdEmergencyContact);
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ message: `${error}` });
  }
}

module.exports = { createEmergencyContact };
