const express = require('express');

const router = express.Router();

const members = require('../controllers/member.controller');

// Create a new Members
router.post('/', members.create);

// Retrieve all Members
router.get('/', members.findAll);

module.exports = router;

// module.exports = (app) => {
//   const members = require('../controllers/member.controller');

//   const router = require('express').Router();

//   // Create a new Members
//   router.post('/', members.create);

//   // Retrieve all Members
//   router.get('/', members.findAll);

//   app.use('/api/members', router);
// };
