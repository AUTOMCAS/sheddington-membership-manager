const models = require('../../../models');

const Members = models.members;

const {
  create,
  validateEntries,
  getById,
  getAll,
} = require('../../../services/member.service');

jest.mock('../../../models');

describe('Member service', () => {
  const createdMember = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd@example.com',
    telephone: '1234567890',
    address: '12 example address',
    gender: 'M',
    joinDate: '2023-12-01T00:00:00.000Z',
    renewalDate: '2024-12-01T00:00:00.000Z',
  };

  const createdEmergencyContact = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  const memberData = {
    member: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'jd@example.com',
      telephone: '1234567890',
      address: '12 example address',
      gender: 'M',
      joinDate: '2023-12-01T00:00:00.000Z',
      renewalDate: '2024-12-01T00:00:00.000Z',
    },
    emergencyContact: {
      firstName: 'Jane',
      lastName: 'Doe',
      telephone: '1234123412',
      relationship: 'Partner',
    },
  };

  describe('validateEntries', () => {
    it('throws an error if a field is an empty string', async () => {
      const data = { firstName: '', lastName: 'Doe' };
      const owner = 'Member';
      await expect(validateEntries(data, owner)).rejects.toThrow(
        "Member's firstName cannot be empty string",
      );
    });

    it('does not throw an error if all fields are not empty strings', async () => {
      const data = { firstName: 'John', lastName: 'Doe' };
      const owner = 'Member';
      await expect(validateEntries(data, owner)).resolves.not.toThrow();
    });

    it('returns if data is null', async () => {
      const data = null;
      const owner = 'Member';
      await expect(validateEntries(data, owner)).resolves.toBeUndefined();
    });
  });

  // describe('create', () => {
  //   it('should create a new member and emergency contact', async () => {
  //     const mockCreatedMember = {
  //       id: 1,
  //       ...memberData.member,
  //     };
  //     const mockCreatedEmergencyContact = {
  //       id: 1,
  //       member_id: 1,
  //       ...memberData.emergencyContact,
  //     };

  //     const created = await create(memberData);

  //     expect(created).toEqual('hi');
  //   });
  // });

  describe('getAll', () => {
    it('should return array', async () => {
      const mockMembersResponse = [];

      Members.findAll = jest.fn().mockResolvedValue(mockMembersResponse);

      const result = await getAll();

      expect(result).toEqual(mockMembersResponse);
    });
    it('should return array of members', async () => {
      const mockMembersResponse = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'jd@example.com',
          telephone: '1234567890',
          address: '12 example address',
          gender: 'M',
          joinDate: '2023-12-01T00:00:00.000Z',
          renewalDate: '2024-12-01T00:00:00.000Z',
        },

        {
          id: 2,
          firstName: 'Ben',
          lastName: 'Smith',
          email: 'bs@example.com',
          telephone: '5123467890',
          address: '22 example address',
          gender: 'M',
          joinDate: '2023-12-01T00:00:00.000Z',
          renewalDate: '2024-12-01T00:00:00.000Z',
        },
      ];

      Members.findAll = jest.fn().mockResolvedValue(mockMembersResponse);

      const result = await getAll();

      expect(result).toEqual(mockMembersResponse);
    });
    it('should throw an error if Members.findAll rejects', async () => {
      const expectedError = new Error('Database error');
      Members.findAll.mockRejectedValueOnce(expectedError);

      await expect(getAll()).rejects.toThrow('Error: Database error');
    });
  });

  // describe('getById', () => {
  //   it('should return a member with the provided id', async () => {
  //     const member = await getById(1);
  //     expect(member.id).toBe(1);
  //     expect(member.firstName).toBe('John');
  //     expect(member.lastName).toBe('Doe');
  //     expect(member.email).toBe('jd@example.com');
  //   });

  //   it('should throw an error if member is not found', async () => {
  //     await expect(getById(999)).rejects.toThrow('Member not found');
  //   });
  // });
});
