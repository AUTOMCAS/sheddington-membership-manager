const express = require('express');

const router = express.Router();

const members = require('../controllers/member.controller');

// Create a new Members
router.post('/', members.create);

// Retrieve all Members
router.get('/', members.findAll);

module.exports = router;
