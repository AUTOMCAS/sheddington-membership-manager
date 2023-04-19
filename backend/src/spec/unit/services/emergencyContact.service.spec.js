const { create } = require('../../../services/emergencyContact.service');
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

  it('should create emergency contact', async () => {
    EmergencyContacts.create = jest
      .fn()
      .mockResolvedValue(mockEmergencyContactResponse);

    const result = await create(emergencyContactData);

    expect(EmergencyContacts.create).toHaveBeenCalledWith(emergencyContactData);
    expect(result).toEqual(mockEmergencyContactResponse);
  });

  it('should catch and throw errors', async () => {
    const mockError = new Error('An error');

    EmergencyContacts.create = jest.fn().mockRejectedValueOnce(mockError);

    await expect(create(emergencyContactData)).rejects.toThrowError('An error');
  });
});
