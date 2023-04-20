const {
  create,
  deleteById,
} = require('../../../services/emergencyContact.service');
const models = require('../../../models');

const EmergencyContacts = models.emergencyContacts;

describe('Emergency contact service', () => {
  const emergencyContactData = {
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
  };

  const mockEmergencyContactResponse = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  describe('create', () => {
    it('should create emergency contact', async () => {
      EmergencyContacts.create = jest
        .fn()
        .mockResolvedValue(mockEmergencyContactResponse);

      const result = await create(emergencyContactData);

      expect(EmergencyContacts.create).toHaveBeenCalledWith(
        emergencyContactData,
      );
      expect(result).toEqual(mockEmergencyContactResponse);
    });

    it('should catch and throw errors', async () => {
      const mockError = new Error('An error');

      EmergencyContacts.create = jest.fn().mockRejectedValueOnce(mockError);

      await expect(create(emergencyContactData)).rejects.toThrowError(
        'An error',
      );
    });
  });

  describe('deleteById', () => {
    it('should return 1 if emergency contact is deleted', async () => {
      EmergencyContacts.destroy = jest.fn().mockResolvedValue(1);

      const id = 1;

      const result = await deleteById(id);

      expect(result).toEqual(1);
      expect(EmergencyContacts.destroy).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return 0 if emergency contact is not found', async () => {
      EmergencyContacts.destroy = jest.fn().mockResolvedValue(0);

      const id = 1;

      const result = await deleteById(id);

      expect(result).toEqual(0);
      expect(EmergencyContacts.destroy).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return errors', async () => {
      const mockError = new Error('An error');
      EmergencyContacts.destroy = jest.fn().mockRejectedValueOnce(mockError);

      const id = 1;

      await expect(deleteById(id)).rejects.toThrowError('An error');
    });
  });
});
