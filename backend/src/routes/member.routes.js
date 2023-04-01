const express = require('express');

const router = express.Router();

const {
  createMember,
  getAllMembers,
  createMemberWithEContact,
} = require('../controllers/member.controller');

// Create a new Member
router.post('/', createMember);

// Retrieve all Members
router.get('/', getAllMembers);

// Create a new Member with emergency contact info
router.post('/create', createMemberWithEContact);

module.exports = router;
