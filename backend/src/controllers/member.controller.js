const memberService = require('../services/member.service');
const { logger } = require('../utils/logger');

const createMember = async (req, res) => {
  const memberData = req.body;

  try {
    const createdMember = await memberService.create(memberData);
    return res.status(200).json(createdMember);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: `${error}` });
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
      .json({ message: `An unknown error occurred. ${error}` });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await memberService.getById(req.params.id);
    return res.status(200).json(member);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: `${error}` });
  }
};

const deleteMemberById = async (req, res) => {
  try {
    const deletionResponse = await memberService.deleteById(req.params.id);

    if (deletionResponse === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.status(204).send();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const updateMemberById = async (req, res) => {
  const newMemberData = req.body;

  if (newMemberData.emergencyContacts) {
    return res.status(400).json({
      message: 'Do not include emergency contacts',
    });
  }

  try {
    const updatedMember = await memberService.updateById(
      req.params.id,
      newMemberData,
    );

    if (updatedMember[0] === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.status(204).send();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMemberById,
  updateMemberById,
};
