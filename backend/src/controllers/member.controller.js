const db = require('../models');

const Members = db.members;

// const Op = db.Sequelize.Op;

// Create and Save a new Member
exports.create = (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });

    return;
  }

  // Create a Member
  const member = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    telephone: req.body.telephone,
    address: req.body.address,
    gender: req.body.gender,
    join_date: req.body.joinDate,
    renewal_date: req.body.renewalDate,
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
