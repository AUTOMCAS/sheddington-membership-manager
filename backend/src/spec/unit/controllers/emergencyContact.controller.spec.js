const {
  createEmergencyContact,
  deleteEmergencyContactById,
  updateEmergencyContactById,
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

  // Create
  describe('create', () => {
    it('should return 201 and created emergency contact if successful', async () => {
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
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        mockEmergencyContactResponse,
      );
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

    it('should return 500 for unknown errors', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error('Unknown error');
      emergencyContactService.create.mockRejectedValue(mockError);

      await createEmergencyContact(emergencyContactData, mockResponse);

      expect(emergencyContactService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Unexpected server error',
      });
    });
  });

  // Update by ID
  describe('updateById', () => {
    const id = 1;
    it('should return 204 on successful update', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const newEmergencyContactData = {
        ...emergencyContactData,
        firstName: 'David',
      };

      const mockRequest = { params: { id }, body: newEmergencyContactData };

      emergencyContactService.updateById = jest.fn().mockResolvedValue([1]);

      await updateEmergencyContactById(mockRequest, mockResponse);

      expect(emergencyContactService.updateById).toHaveBeenCalledWith(
        newEmergencyContactData,
        id,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 404 if emergency contact does not exist', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const newEmergencyContactData = {
        ...emergencyContactData,
        firstName: 'David',
      };

      const mockRequest = { params: { id }, body: newEmergencyContactData };

      emergencyContactService.updateById = jest.fn().mockResolvedValue([0]);

      await updateEmergencyContactById(mockRequest, mockResponse);

      expect(emergencyContactService.updateById).toHaveBeenCalledWith(
        newEmergencyContactData,
        id,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Emergency contact with that ID not found',
      });
    });

    it('should return 500 for unknown errors', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const newEmergencyContactData = {
        ...emergencyContactData,
        firstName: 'David',
      };

      const mockRequest = { params: { id }, body: newEmergencyContactData };

      const mockError = new Error('Unknown error');
      emergencyContactService.updateById.mockRejectedValue(mockError);

      await updateEmergencyContactById(mockRequest, mockResponse);

      expect(emergencyContactService.updateById).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Unexpected server error',
      });
    });
  });

  // Delete by ID
  describe('DeleteById', () => {
    it('should return 204 on successful deletion', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const id = 1;

      const mockRequest = { params: { id } };

      emergencyContactService.deleteById = jest.fn().mockResolvedValue(1);

      await deleteEmergencyContactById(mockRequest, mockResponse);

      expect(emergencyContactService.deleteById).toHaveBeenCalledWith(id);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 404 if emergency contact does not exist', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const mockRequest = { params: 'invalid' };

      emergencyContactService.deleteById = jest.fn().mockResolvedValue(0);

      await deleteEmergencyContactById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Emergency contact with that ID not found',
      });
    });

    it('should return 500 for unknown errors', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const id = 1;

      const mockRequest = { params: { id } };

      const mockError = new Error('Unknown error');
      emergencyContactService.deleteById.mockRejectedValue(mockError);

      await deleteEmergencyContactById(mockRequest, mockResponse);

      expect(emergencyContactService.deleteById).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Unexpected server error',
      });
    });
  });
});
