const {
  create,
  deleteById,
  updateById,
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

  // Create
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

  // Update
  describe('Update', () => {
    const newEmergencyContactData = {
      firstName: 'Jane',
    };

    const id = 1;

    it('should update an emergency contact', async () => {
      EmergencyContacts.update = jest.fn().mockResolvedValue(1);

      const result = await updateById(newEmergencyContactData, id);

      expect(result).toEqual(1);
      expect(EmergencyContacts.update).toHaveBeenCalledWith(
        newEmergencyContactData,
        { where: { id } },
      );
    });

    it('should return 0 if emergency contact not updated/found', async () => {
      EmergencyContacts.update = jest.fn().mockResolvedValue(0);

      const result = await updateById(newEmergencyContactData, id);

      expect(result).toEqual(0);
      expect(EmergencyContacts.update).toHaveBeenCalledWith(
        newEmergencyContactData,
        { where: { id } },
      );
    });

    it('should return errors', async () => {
      const mockError = new Error('An error');
      EmergencyContacts.update = jest.fn().mockRejectedValueOnce(mockError);

      await expect(
        updateById(newEmergencyContactData, id),
      ).rejects.toThrowError('An error');
    });
  });

  // Delete by ID
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
