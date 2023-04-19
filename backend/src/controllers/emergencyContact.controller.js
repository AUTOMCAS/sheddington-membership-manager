const emergencyContactService = require('../services/emergencyContact.service');
const { logger } = require('../utils/logger');
const { validateEntries } = require('../utils/validation');

const createEmergencyContact = async (req, res) => {
  const emergencyContact = req.body;

  try {
    await validateEntries(emergencyContact, 'Emergency Contact');

    const createdEmergencyContact = await emergencyContactService.create(
      emergencyContact,
    );

    return res.status(200).json(createdEmergencyContact);
  } catch (error) {
    logger.error(error);

    if (error.code === 'EMPTY_ENTRY') {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

module.exports = { createEmergencyContact };
