const models = require('../models');
const { sequelize } = require('../models');
const { validateMemberData } = require('../utils/validation');

const Members = models.members;
const EmergencyContact = models.emergencyContacts;

const getAll = async () => {
  try {
    return await Members.findAll({ include: 'emergencyContacts' });
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    return await Members.findByPk(id, { include: 'emergencyContacts' });
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (memberData) => {
  try {
    const { emergencyContacts, ...member } = await validateMemberData(
      memberData,
    );

    return await sequelize.transaction(async (t) => {
      const createdMember = await Members.create(member, {
        transaction: t,
      });

      const updatedEmergencyContacts = emergencyContacts.map(
        (emergencyContact) => ({
          ...emergencyContact,
          member_id: createdMember.id,
        }),
      );

      const createdEmergencyContacts = await EmergencyContact.bulkCreate(
        updatedEmergencyContacts,
        {
          transaction: t,
          validate: true,
        },
      );

      return { ...createdMember.dataValues, createdEmergencyContacts };
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Email must be unique');
    } else {
      throw new Error(error.message.replace(error));
    }
  }
};

const deleteById = async (id) => {
  let message = null;

  try {
    message = await Members.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }

  if (message === 0) {
    throw new Error('Member not found');
  } else {
    return 'Member deleted';
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
