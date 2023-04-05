const memberService = require('../../../services/member.service');

jest.mock('../../../services/member.service');

const {
  createMember,
  getAllMembers,
  getMemberById,
} = require('../../../controllers/member.controller');

describe('member controller', () => {
  describe('createMember', () => {
    const mockRequest = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'js@example.com',
      telephone: '1234567890',
      address: '12 example address',
      gender: 'M',
      joinDate: '2023-12-01T00:00:00.000Z',
      renewalDate: '2024-12-01T00:00:00.000Z',
      emergencyContact: {
        firstName: 'Jane',
        lastName: 'Smith',
        telephone: '1234123412',
        relationship: 'Partner',
      },
    };

    const mockCreatedMember = {
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

    const mockResponse = () => {
      const res = {};
      res.send = jest.fn().mockReturnValue(res);
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    it('should return 200 status code and created member', async () => {
      const mockRes = mockResponse();

      memberService.create = jest.fn().mockResolvedValue(mockCreatedMember);

      await createMember(mockRequest, mockRes);

      expect(memberService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedMember);
      expect(mockRes.send).not.toHaveBeenCalled();
    });

    it('should return 400 status code and error message', async () => {
      const mockRes = mockResponse();
      const mockError = new Error('Email must be unique');

      memberService.create = jest.fn().mockRejectedValue(mockError);

      await createMember(mockRequest, mockRes);

      expect(memberService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: `${mockError}` });
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });

  describe('getAllMembers', () => {
    it('should return 200 status code and member list', async () => {
      const mockMembers = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];

      memberService.getAll = jest.fn().mockResolvedValue(mockMembers);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllMembers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMembers);
    });

    it('should return 400 status code and handle errors', async () => {
      const mockError = new Error('An unknown error occurred.');

      memberService.getAll.mockRejectedValue(mockError);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getAllMembers(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: `An unknown error occurred. ${mockError}`,
      });
    });
  });

  describe('getMemberById', () => {
    it('should return member by id', async () => {
      const mockMember = { id: 1, name: 'John Smith' };
      memberService.getById.mockResolvedValue(mockMember);

      const mockRequest = { params: { id: 1 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMember);
    });

    it('should return 400 status code and handle errors', async () => {
      const mockError = new Error('Unknown error occurred');
      memberService.getById.mockRejectedValue(mockError);

      const mockRequest = { params: { id: 1 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
