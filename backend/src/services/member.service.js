const models = require('../models');
const { sequelize } = require('../models');

const Members = models.members;
const EmergencyContacts = models.emergencyContacts;

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
    const { emergencyContacts, ...member } = memberData;

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

      const createdEmergencyContacts = await EmergencyContacts.bulkCreate(
        updatedEmergencyContacts,
        {
          transaction: t,
          validate: true,
        },
      );

      return { ...createdMember.dataValues, createdEmergencyContacts };
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteById = async (id) => {
  try {
    return await Members.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

const updateById = async (id, newMemberData) => {
  try {
    const updatedMember = await Members.update(newMemberData, {
      where: { id },
    });

    return updatedMember;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
