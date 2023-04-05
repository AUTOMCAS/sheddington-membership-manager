const models = require('../../../models');

const Members = models.members;

const {
  validateEntries,
  getById,
  getAll,
} = require('../../../services/member.service');

jest.mock('../../../models');

describe('Member service', () => {
  const mockMember = {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'js@example.com',
    telephone: '1234567890',
    address: '12 example address',
    gender: 'M',
    joinDate: '2023-12-01T00:00:00.000Z',
    renewalDate: '2024-12-01T00:00:00.000Z',
    createdEmergencyContact: {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      telephone: '1234123412',
      relationship: 'Partner',
      member_id: 1,
    },
  };

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
          lastName: 'Smith',
          email: 'js@example.com',
          telephone: '1234567890',
          address: '12 example address',
          gender: 'M',
          joinDate: '2023-12-01T00:00:00.000Z',
          renewalDate: '2024-12-01T00:00:00.000Z',
        },

        {
          id: 2,
          firstName: 'Ben',
          lastName: 'Leaf',
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
      const mockError = new Error('Database error');
      Members.findAll.mockRejectedValueOnce(mockError);

      await expect(getAll()).rejects.toThrow('Error: Database error');
    });
  });

  describe('getById', () => {
    it('should return a member with the provided id', async () => {
      Members.findByPk = jest.fn().mockResolvedValue(mockMember);
      const result = await getById(mockMember.id);
      expect(result).toEqual(mockMember);
    });

    it('should throw an error if no member with the given ID is found', async () => {
      const mockError = new Error('Member not found');
      Members.findByPk.mockRejectedValueOnce(mockError);

      await expect(getById(mockMember.Id)).rejects.toThrowError(
        'Member not found',
      );
    });
  });
});
