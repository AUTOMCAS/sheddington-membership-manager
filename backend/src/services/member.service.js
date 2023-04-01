const models = require('../models');
const { sequelize } = require('../models');

const Members = models.members;
const EmergencyContact = models.emergencyContacts;

async function create(member) {
  const memberEntries = Object.entries(member);

  memberEntries.forEach((entry) => {
    if (entry[1].length === 0) {
      throw new Error(`${entry[0]} cannot be null/empty`);
    }
  });

  try {
    return await Members.create(member);
  } catch (error) {
    if (error.errors[0].message === 'email must be unique') {
      throw new Error('Email must be unique');
    }
    throw new Error(error);
  }
}

async function getAll() {
  try {
    return await Members.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

async function createWithEContact(memberWithEContact) {
  const { member, emergencyContact } = memberWithEContact;

  try {
    return await sequelize.transaction(async (t) => {
      const createdMember = await Members.create(member, { transaction: t });

      emergencyContact.member_id = createdMember.id;

      const createdEmergencyContact = await EmergencyContact.create(
        emergencyContact,
        { transaction: t },
      );

      return { createdEmergencyContact, createdMember };
    });
  } catch (error) {
    if (error.errors[0].message === 'email must be unique') {
      throw new Error('Email must be unique');
    }

    throw new Error(error);
  }
}

module.exports = { create, getAll, createWithEContact };
