const memberService = require('../services/member.services');

// const db = require('../models');

// const Members = db.members;

// const Op = db.Sequelize.Op;

const createMember = async (req, res) => {
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

  const createdMember = await memberService.create(member);

  res.status(200).json({
    status: 'success',
    createdMember,
  });
};

const getAllMembers = async (req, res) => {
  const members = await memberService.getAll();

  res.status(200).json({
    status: 'success',
    members,
  });
};

module.exports = {
  createMember,
  getAllMembers,
};
