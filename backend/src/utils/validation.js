const CustomError = require('./errorHandling');

const validateEntries = async (data, owner) => {
  if (data === null) return;
  const entries = Object.entries(data);

  entries.forEach((entry) => {
    if (entry[1].length === 0) {
      throw new CustomError(
        `${owner}'s ${entry[0]} cannot be empty string`,
        'EMPTY_ENTRY',
      );
    }
  });
};

const validateMemberData = async (memberData) => {
  if (!memberData.emergencyContacts) {
    throw new CustomError(
      'Emergency Contacts missing',
      'EMERGENCY_CONTACTS_MISSING',
    );
  }

  const { emergencyContacts, ...member } = memberData;

  await validateEntries(member, 'Member');

  await Promise.all(
    emergencyContacts.map(async (emergencyContact) => {
      await validateEntries(emergencyContact, 'Emergency Contact');
    }),
  );

  return { emergencyContacts, ...member };
};

module.exports = { validateEntries, validateMemberData };
