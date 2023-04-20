const {
  createEmergencyContact,
} = require('../../../controllers/emergencyContact.controller');

const emergencyContactService = require('../../../services/emergencyContact.service');
const { validateEntries } = require('../../../utils/validation');

jest.mock('../../../services/emergencyContact.service');
jest.mock('../../../utils/validation');

describe('Emergency contact controller', () => {
  const emergencyContactData = {
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  const mockEmergencyContactResponse = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  it('should return 200 and created emergency contact if successful', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validateEntries.mockResolvedValue(null);

    emergencyContactService.create = jest
      .fn()
      .mockResolvedValue(mockEmergencyContactResponse);

    await createEmergencyContact(emergencyContactData, mockResponse);

    expect(emergencyContactService.create).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      mockEmergencyContactResponse,
    );
  });

  it('should return 500 for unknown errors', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error('Unknown error occurred');
    emergencyContactService.create.mockRejectedValue(mockError);

    await createEmergencyContact(emergencyContactData, mockResponse);

    expect(emergencyContactService.create).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Unexpected server error',
    });
  });

  it('should return 409 for invalid entries', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error(
      "Emergency Contact's firstName cannot be empty string",
    );
    mockError.code = 'EMPTY_ENTRY';

    validateEntries.mockRejectedValue(mockError);

    await createEmergencyContact(emergencyContactData, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Emergency Contact's firstName cannot be empty string",
    });
    expect(emergencyContactService.create).not.toHaveBeenCalled();
  });
});
