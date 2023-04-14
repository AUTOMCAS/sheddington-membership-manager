const memberService = require('../services/member.service');
const { logger } = require('../utils/logger');

const createMember = async (req, res) => {
  const memberData = req.body;

  try {
    const createdMember = await memberService.create(memberData);
    return res.status(200).json(createdMember);
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ message: `${error}` });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAll();
    return res.status(200).json(members);
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .send({ message: `An unknown error occurred. ${error}` });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await memberService.getById(req.params.id);
    return res.status(200).json(member);
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ message: `${error}` });
  }
};

const deleteMemberById = async (req, res) => {
  try {
    await memberService.deleteById(req.params.id);
    return res.status(204).send();
  } catch (error) {
    logger.error(error);
    return res.status(404).send({ message: `${error}` });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMemberById,
};
