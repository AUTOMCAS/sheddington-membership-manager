const express = require('express');

const router = express.Router();

const {
  createMember,
  getAllMembers,
  getMemberById,
} = require('../controllers/member.controller');

// Create a new Member
router.post('/', createMember);

// Retrieve all Members
router.get('/', getAllMembers);

// Retrieve Member by ID
router.get('/:id', getMemberById);

module.exports = router;
