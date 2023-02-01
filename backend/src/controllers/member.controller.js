const memberService = require('../services/member.services');
const { logger } = require('../utils/logger');

async function createMember(req, res) {
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

  const isEmpty = Object.keys(req.body).length === 0;
  if (isEmpty) return res.status(400).send({ message: 'All fields required' });

  try {
    const createdMember = await memberService.create(member);
    return res.status(200).json(createdMember);
  } catch (error) {
    console.log('ERROR', error);
    return res.status(400).send({ message: 'An unknown error occurred.' });
  }
}

async function getAllMembers(req, res) {
  try {
    const members = await memberService.getAll();
    return res.status(200).json(members);
  } catch (error) {
    return res.status(400).send({ message: 'An unknown error occurred.' });
  }
}

module.exports = {
  createMember,
  getAllMembers,
};
