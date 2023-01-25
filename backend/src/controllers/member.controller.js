const db = require('../models');

const Members = db.members;

// const Op = db.Sequelize.Op;

// Create and Save a new Member
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });

    return;
  }

  // Create a Member
  const member = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    telephone: req.body.telephone,
    address: req.body.address,
    gender: req.body.gender,
    joinDate: req.body.joinDate,
    renewalDate: req.body.renewalDate,
  };

  // Save Member in the database
  Members.create(member)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Member.',
      });
    });
};

exports.findAll = (req, res) => {
  Members.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Members',
      });
    });
};
