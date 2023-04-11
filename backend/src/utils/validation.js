const validateEntries = async (data, owner) => {
  if (data === null) return;
  const entries = Object.entries(data);

  entries.forEach((entry) => {
    if (entry[1].length === 0) {
      throw new Error(`${owner}'s ${entry[0]} cannot be empty string`);
    }
  });
};

const validateMemberData = async (memberData) => {
  if (!memberData.emergencyContacts) {
    throw new Error('Emergency Contacts missing');
  }

  const { emergencyContacts, ...member } = memberData;

  await validateEntries(member, 'Member');

  await emergencyContacts.forEach((emergencyContact) => {
    validateEntries(emergencyContact, 'Emergency Contact');
  });

  return { emergencyContacts, ...member };
};
module.exports = { validateEntries, validateMemberData };
