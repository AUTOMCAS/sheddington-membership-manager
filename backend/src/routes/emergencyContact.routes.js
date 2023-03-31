const express = require('express');

const router = express.Router();

const {
  createEmergencyContact,
} = require('../controllers/emergencyContact.controller');

// Create a new emergencyContact
router.post('/', createEmergencyContact);

module.exports = router;
