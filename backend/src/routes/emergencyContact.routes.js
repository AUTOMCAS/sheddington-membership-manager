const express = require('express');

const router = express.Router();

const {
  createEmergencyContact,
  deleteEmergencyContactById,
  updateEmergencyContactById,
} = require('../controllers/emergencyContact.controller');

// Create a new emergencyContact
router.post('/', createEmergencyContact);

// Update emergencyContact by ID
router.put('/:id', updateEmergencyContactById);

// Delete emergencyContact by ID
router.delete('/:id', deleteEmergencyContactById);

module.exports = router;
