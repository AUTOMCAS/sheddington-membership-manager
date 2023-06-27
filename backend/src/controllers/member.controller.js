const memberService = require('../services/member.service');
const { validateMemberData } = require('../utils/validation');
const { logger } = require('../utils/logger');

const getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAll();

    return res.status(200).json(members);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await memberService.getById(req.params.id);

    if (member === null) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.status(200).json(member);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const createMember = async (req, res) => {
  const memberData = req.body;

  try {
    await validateMemberData(memberData);

    const createdMember = await memberService.create(memberData);

    return res.status(201).json(createdMember);
  } catch (error) {
    logger.error(error);

    if (
      error.code === 'EMERGENCY_CONTACTS_MISSING'
      || error.code === 'EMPTY_ENTRY'
    ) {
      return res.status(409).json({ message: error.message });
    }

    if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
      return res.status(409).json({ message: 'Email must be unique' });
    }

    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const updateMemberById = async (req, res) => {
  const newMemberData = req.body;

  if (newMemberData.emergencyContacts) {
    return res.status(400).json({
      message: 'Do not include emergencyContacts',
    });
  }

  try {
    const updatedMember = await memberService.updateById(
      newMemberData,
      req.params.id,
    );

    if (updatedMember[0] === 0) {
      return res.status(404).json({ message: 'Member with that ID not found' });
    }

    return res.status(204).send();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};

const deleteMemberById = async (req, res) => {
  try {
    const deletionResponse = await memberService.deleteById(req.params.id);

    if (deletionResponse === 0) {
      return res.status(404).json({ message: 'Member with that ID not found' });
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
