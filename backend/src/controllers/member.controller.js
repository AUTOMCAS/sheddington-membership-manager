const memberService = require('../services/member.services');
const { logger } = require('../utils/logger');

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
  try {
    const createdMember = await memberService.create(member);
    return res.send(createdMember);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAll();
    return res.send(members);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createMember,
  getAllMembers,
};
