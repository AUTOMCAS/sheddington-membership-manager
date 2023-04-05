const models = require('../models');
const { sequelize } = require('../models');

const Members = models.members;
const EmergencyContact = models.emergencyContacts;

const validateEntries = async (data, owner) => {
  if (data === null) return;
  const entries = Object.entries(data);

  entries.forEach((entry) => {
    if (entry[1].length === 0) {
      throw new Error(`${owner}'s ${entry[0]} cannot be empty string`);
    }
  });
};

const getAll = async () => {
  try {
    return await Members.findAll();
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    return await Members.findByPk(id);
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (memberData) => {
  const { emergencyContact, ...member } = memberData;
  await validateEntries(member, 'Member');
  await validateEntries(emergencyContact, 'Emergency Contact');

  try {
    return await sequelize.transaction(async (t) => {
      const createdMember = await Members.create(member, {
        transaction: t,
      });

      emergencyContact.member_id = createdMember.id;

      const newEmergencyContact = await EmergencyContact.create(
        emergencyContact,
        { transaction: t },
      );

      return { ...createdMember.dataValues, newEmergencyContact };
    });
  } catch (error) {
    if (error.errors[0].message === 'email must be unique') {
      throw new Error('Email must be unique');
    }

    throw new Error(error);
  }
};

module.exports = {
  create,
  getAll,
  validateEntries,
  getById,
};
