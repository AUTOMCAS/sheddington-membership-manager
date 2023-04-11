const {
  validateMemberData,
  validateEntries,
} = require('../../../utils/validation');
const { memberData } = require('../../testData');

describe('validateMemberData ', () => {
  it('should return member and emergencyContact if valid', async () => {
    const { emergencyContacts, ...member } = memberData;

    const {
      emergencyContacts: validatedEmergencyContacts,
      ...validatedMember
    } = await validateMemberData(memberData);

    expect(validatedEmergencyContacts).toEqual(emergencyContacts);
    expect(validatedMember).toEqual(member);
  });

  it('should throw if emergencyContacts field is missing', async () => {
    const memberDataMock = { firstName: 'John' };

    await expect(validateMemberData(memberDataMock)).rejects.toThrow(
      'Emergency Contacts missing',
    );
  });
});

describe('validateEntries', () => {
  it('throws an error if a field is an empty string', async () => {
    const data = { firstName: '', lastName: 'Smith' };
    const owner = 'Member';
    await expect(validateEntries(data, owner)).rejects.toThrow(
      "Member's firstName cannot be empty string",
    );
  });

  it('does not throw an error if all fields are not empty strings', async () => {
    const data = { firstName: 'John', lastName: 'Smith' };
    const owner = 'Member';
    await expect(validateEntries(data, owner)).resolves.not.toThrow();
  });

  it('returns if data is null', async () => {
    const data = null;
    const owner = 'Member';
    await expect(validateEntries(data, owner)).resolves.toBeUndefined();
  });
});
