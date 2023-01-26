const express = require('express');

const router = express.Router();

const MemberController = require('../controllers/member.controller');

// Create a new Members
router.post('/', MemberController.Create);

// Retrieve all Members
router.get('/', MemberController.FindAll);

module.exports = router;
