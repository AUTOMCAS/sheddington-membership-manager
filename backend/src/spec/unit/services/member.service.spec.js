const models = require('../../../models');
const { sequelize } = require('../../../models');
const { expectedMemberResponse, memberData } = require('../../testData');
const { validateMemberData } = require('../../../utils/validation');

jest.mock('../../../utils/validation');

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

  const sequelizeCreatedEmergencyContacts = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      telephone: '1234123412',
      relationship: 'Partner',
      member_id: 1,
    },
  ];

  // Create member
  describe('create', () => {
    it('should first create a member and then, if successful, an emergency contact', async () => {
      // Mock setup - Arrange
      sequelize.transaction = jest
        .fn()
        .mockImplementation(async (callback) => callback());

      validateMemberData.mockResolvedValue(memberData);

      Members.create = jest.fn().mockResolvedValue(sequelizeCreatedMember);

      EmergencyContact.bulkCreate = jest
        .fn()
        .mockResolvedValue(sequelizeCreatedEmergencyContacts);
      const { emergencyContacts, ...member } = memberData;

      // Act
      const result = await create(memberData);

      // Assert
      expect(sequelize.transaction).toHaveBeenCalled();
      expect(Members.create).toHaveBeenCalledWith(member, {
        transaction: undefined,
      });
      expect(EmergencyContact.bulkCreate).toHaveBeenCalledWith(
        emergencyContacts,
        {
          transaction: undefined,
          validate: true,
        },
      );
      expect(result).toEqual(expectedMemberResponse);
    });

    it('should throw an error if email is not unique', async () => {
      sequelize.transaction = jest
        .fn()
        .mockImplementation(async (callback) => callback());

      const sequelizeUniqueConstraintError = new Error(
        'SequelizeUniqueConstraintError',
      );
      sequelizeUniqueConstraintError.name = 'SequelizeUniqueConstraintError';
      validateMemberData.mockResolvedValue(memberData);

      Members.create = jest
        .fn()
        .mockRejectedValueOnce(sequelizeUniqueConstraintError);

      await expect(create(memberData)).rejects.toThrow('Email must be unique');

      expect(validateMemberData).toHaveBeenCalledWith(memberData);
      expect(EmergencyContact.bulkCreate).not.toHaveBeenCalled();
    });

    it('should throw an error for any other error', async () => {
      sequelize.transaction = jest
        .fn()
        .mockImplementation(async (callback) => callback());

      const mockError = new Error('An error');

      validateMemberData.mockResolvedValueOnce(memberData);

      sequelize.transaction.mockImplementationOnce((fn) => {
        throw mockError;
      });

      await expect(create(memberData)).rejects.toThrow(mockError.message);
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
    it('should return 1 if member is deleted', async () => {
      const id = 1;
      Members.destroy = jest.fn().mockResolvedValue(1);

      const result = await deleteById(id);

      expect(result).toEqual(1);
      expect(Members.destroy).toHaveBeenCalledTimes(1);
      expect(Members.destroy).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return 0 if member not found', async () => {
      const id = 1;
      Members.destroy = jest.fn().mockResolvedValue(0);

      const result = await deleteById(id);

      expect(result).toEqual(0);
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
