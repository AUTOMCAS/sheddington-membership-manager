const emergencyContactService = require('../services/emergencyContact.service');
const { logger } = require('../utils/logger');
const { validateEntries } = require('../utils/validation');

const createEmergencyContact = async (req, res) => {
  const emergencyContact = req.body;

  try {
    await validateEntries(emergencyContact, 'Emergency contact');

    const createdEmergencyContact = await emergencyContactService.create(
      emergencyContact,
    );

    return res.status(201).json(createdEmergencyContact);
  } catch (error) {
    logger.error(error);

    if (error.message.includes('SequelizeForeignKeyConstraintError')) {
      return res
        .status(409)
        .json({ message: 'Member with that ID does not exist' });
    }
    if (error.code === 'EMPTY_ENTRY') {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const updateEmergencyContactById = async (req, res) => {
  const { id } = req.params;
  const newEmergencyContactData = req.body;

  try {
    const updateResponse = await emergencyContactService.updateById(
      newEmergencyContactData,
      id,
    );

    if (updateResponse[0] === 0) {
      return res
        .status(404)
        .json({ message: 'Emergency contact with that ID not found' });
    }

    return res.status(204).send();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const deleteEmergencyContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletionResponse = await emergencyContactService.deleteById(id);

    if (deletionResponse === 0) {
      return res
        .status(404)
        .json({ message: 'Emergency contact with that ID not found' });
    }

    return res.status(204).send();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

module.exports = {
  createEmergencyContact,
  deleteEmergencyContactById,
  updateEmergencyContactById,
};
