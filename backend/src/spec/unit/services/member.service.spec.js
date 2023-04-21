const models = require('../../../models');
const { sequelize } = require('../../../models');
const { expectedMemberResponse, memberData } = require('../../testData');

const Members = models.members;
const EmergencyContacts = models.emergencyContacts;

const {
  create,
  getById,
  getAll,
  updateById,
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

      Members.create = jest.fn().mockResolvedValue(sequelizeCreatedMember);

      EmergencyContacts.bulkCreate = jest
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
      expect(EmergencyContacts.bulkCreate).toHaveBeenCalledWith(
        emergencyContacts,
        {
          transaction: undefined,
          validate: true,
        },
      );
      expect(result).toEqual(expectedMemberResponse);
    });

    it('should throw an error for any error', async () => {
      sequelize.transaction = jest
        .fn()
        .mockImplementation(async (callback) => callback());

      const mockError = new Error('An error');

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

  // Update
  describe('Update', () => {
    const newMemberData = {
      firstName: 'Jane',
    };

    const id = 1;

    it('should update an member', async () => {
      Members.update = jest.fn().mockResolvedValue([1]);

      const result = await updateById(newMemberData, id);

      expect(result).toEqual([1]);
      expect(Members.update).toHaveBeenCalledWith(newMemberData, {
        where: { id },
      });
    });

    it('should return [0] if emergency contact not updated/found', async () => {
      Members.update = jest.fn().mockResolvedValue([0]);

      const result = await updateById(newMemberData, id);

      expect(result).toEqual([0]);
      expect(Members.update).toHaveBeenCalledWith(newMemberData, {
        where: { id },
      });
    });

    it('should return errors', async () => {
      const mockError = new Error('An error');
      Members.update = jest.fn().mockRejectedValueOnce(mockError);

      await expect(updateById(newMemberData, id)).rejects.toThrowError(
        'An error',
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
