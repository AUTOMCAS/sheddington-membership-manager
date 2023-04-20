const express = require('express');

const router = express.Router();

const {
  createEmergencyContact,
  deleteEmergencyContactById,
} = require('../controllers/emergencyContact.controller');

// Create a new emergencyContact
router.post('/', createEmergencyContact);

// Delete emergencyContact by ID

router.delete('/:id', deleteEmergencyContactById);

module.exports = router;
