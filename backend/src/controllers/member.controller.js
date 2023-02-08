const memberService = require('../services/member.services');
const { logger } = require('../utils/logger');

async function createMember(req, res) {
  const member = req.body;
  const isEmpty = Object.keys(req.body).length === 0;
  if (isEmpty) return res.status(400).send({ message: 'All fields required' });

  try {
    const createdMember = await memberService.create(member);
    return res.status(200).json(createdMember);
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ message: `${error}` });
  }
}

async function getAllMembers(req, res) {
  try {
    const members = await memberService.getAll();
    return res.status(200).json(members);
  } catch (error) {
    return res
      .status(400)
      .send({ message: `An unknown error occurred. ${error}` });
  }
}

module.exports = {
  createMember,
  getAllMembers,
};
