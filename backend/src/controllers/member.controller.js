const memberService = require('../services/member.service');
const { logger } = require('../utils/logger');

async function createMember(req, res) {
  const member = req.body;

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
    logger.error(error);
    return res
      .status(400)
      .send({ message: `An unknown error occurred. ${error}` });
  }
}

async function createMemberWithEContact(req, res) {
  const memberWithEContact = req.body;

  try {
    const createdMember = await memberService.createWithEContact(
      memberWithEContact,
    );
    return res.status(200).json(createdMember);
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ message: `${error}` });
  }
}

module.exports = {
  createMember,
  getAllMembers,
  createMemberWithEContact,
};
