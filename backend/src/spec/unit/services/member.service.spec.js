const models = require('../../../models');
const { sequelize } = require('../../../models');
const { expectedMemberResponse, memberData } = require('../../testData');

const Members = models.members;
const EmergencyContact = models.emergencyContacts;

const {
  create,
  getById,
  getAll,
  deleteById,
} = require('../../../services/member.service');

describe('Member service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sequelizeCreatedMember = {
    dataValues: {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'js@example.com',
      telephone: '1234567890',
      address: '12 example address',
      gender: 'M',
      interests: ['Making and Mending', 'Gardening'],
      medicalConditions: ['Lower body paralysis'],
      specialRequirements: ['Wheelchair access'],
      joinDate: '2023-12-01T00:00:00.000Z',
      renewalDate: '2024-12-01T00:00:00.000Z',
    },
  };

  const sequelizeCreatedEmergencyContact = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  // Create member
  describe('create', () => {
    it('should first create a member and then, if successful, an emergency contact', async () => {
      sequelize.transaction = jest
        .fn()
        .mockImplementation(async (callback) => callback());

      Members.create = jest.fn().mockResolvedValue(sequelizeCreatedMember);
      EmergencyContact.create = jest
        .fn()
        .mockResolvedValue(sequelizeCreatedEmergencyContact);

      const { emergencyContacts, ...member } = memberData;

      const result = await create(memberData);

      expect(sequelize.transaction).toHaveBeenCalled();
      expect(Members.create).toHaveBeenCalledWith(member, {
        transaction: undefined,
      });
      expect(EmergencyContact.create).toHaveBeenCalledWith(
        emergencyContacts[0],
        {
          transaction: undefined,
        },
      );
      expect(result).toEqual(expectedMemberResponse);
    });

    it('should throw an error if email is not unique', async () => {
      const mockData = {
        firstName: 'John',
        email: 'js@example.com',
        emergencyContacts: [
          {
            firstName: 'Jane',
          },
        ],
      };

      sequelize.transaction = jest
        .fn()
        .mockImplementation(async (callback) => callback());

      Members.create = jest.fn().mockRejectedValue({
        errors: [{ message: 'email must be unique' }],
      });

      await expect(create(mockData)).rejects.toThrowError(
        'Email must be unique',
      );
    });

    it('should throw an error if emergencyContacts are missing', async () => {
      const mockData = {
        firstName: 'John',
        email: 'js@example.com',
      };

      await expect(create(mockData)).rejects.toThrowError(
        'Emergency Contacts missing',
      );
    });
  });

  // Get all members
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
          email: 'js@example.com',
        },

        {
          id: 2,
          firstName: 'Ben',
          email: 'bs@example.com',
        },
      ];

      Members.findAll = jest.fn().mockResolvedValue(mockMembersResponse);

      const result = await getAll();

      expect(result).toEqual(mockMembersResponse);
    });

    it('should throw an error if Members.findAll rejects', async () => {
      const mockError = new Error('Database error');
      Members.findAll.mockRejectedValueOnce(mockError);

      await expect(getAll()).rejects.toThrowError('Error: Database error');
    });
  });

  // Get member by ID
  describe('getById', () => {
    it('should return a member with the provided id', async () => {
      Members.findByPk = jest.fn().mockResolvedValue(expectedMemberResponse);

      const result = await getById(expectedMemberResponse.id);

      expect(result).toEqual(expectedMemberResponse);
      expect(Members.findByPk).toHaveBeenCalledWith(expectedMemberResponse.id, {
        include: 'emergencyContacts',
      });
    });

    it('should throw an error if no member with the given ID is found', async () => {
      const mockError = new Error('Member not found');
      Members.findByPk.mockRejectedValueOnce(mockError);

      await expect(getById(expectedMemberResponse.id)).rejects.toThrowError(
        'Member not found',
      );
    });
  });

  // Delete member by ID
  describe('deleteById', () => {
    it('should delete member with valid id', async () => {
      const id = 1;
      Members.destroy = jest.fn().mockResolvedValue(1);

      const result = await deleteById(id);

      expect(result).toEqual('Member deleted');
      expect(Members.destroy).toHaveBeenCalledTimes(1);
      expect(Members.destroy).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an error if member not found', async () => {
      const id = 1;
      Members.destroy = jest.fn().mockResolvedValue(0);

      await expect(deleteById(id)).rejects.toThrow('Member not found');

      expect(Members.destroy).toHaveBeenCalledTimes(1);
      expect(Members.destroy).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an error if database operation fails', async () => {
      const id = 1;
      const errorMessage = 'Database operation failed';
      Members.destroy = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(deleteById(id)).rejects.toThrow(errorMessage);

      expect(Members.destroy).toHaveBeenCalledTimes(1);
      expect(Members.destroy).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
