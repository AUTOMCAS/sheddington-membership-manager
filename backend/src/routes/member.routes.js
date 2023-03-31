const express = require('express');

const router = express.Router();

const {
  createMember,
  getAllMembers,
} = require('../controllers/member.controller');

// Create a new Member
router.post('/', createMember);

// Retrieve all Members
router.get('/', getAllMembers);

module.exports = router;
