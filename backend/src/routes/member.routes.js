const express = require('express');

const router = express.Router();

const {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMemberById,
} = require('../controllers/member.controller');

// Create a new Member
router.post('/', createMember);

// Retrieve all Members
router.get('/', getAllMembers);

// Retrieve Member by ID
router.get('/:id', getMemberById);

// Delete Member by ID
router.delete('/:id', deleteMemberById);

module.exports = router;
