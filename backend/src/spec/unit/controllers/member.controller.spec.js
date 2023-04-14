const memberService = require('../../../services/member.service');
const { expectedMemberResponse, memberData } = require('../../testData');

jest.mock('../../../services/member.service');

const {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMemberById,
} = require('../../../controllers/member.controller');

describe('member controller', () => {
  // Create member
  describe('createMember', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return 200 status code and created member', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      memberService.create = jest
        .fn()
        .mockResolvedValue(expectedMemberResponse);

      await createMember(memberData, mockResponse);

      expect(memberService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedMemberResponse);
      expect(mockResponse.send).not.toHaveBeenCalled();
    });

    it('should return 400 status code and error message', async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
      const mockError = new Error('Email must be unique');

      memberService.create = jest.fn().mockRejectedValue(mockError);

      await createMember(memberData, mockResponse);

      expect(memberService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: `${mockError}`,
      });
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  // Get all members
  describe('getAllMembers', () => {
    it('should return 200 status code and member list', async () => {
      const mockMembers = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];

      memberService.getAll = jest.fn().mockResolvedValue(mockMembers);

      const mockRequest = {};
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllMembers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMembers);
    });

    it('should return 400 status code and handle errors', async () => {
      const mockError = new Error('An unknown error occurred.');

      memberService.getAll.mockRejectedValue(mockError);

      const mockRequest = {};
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getAllMembers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: `An unknown error occurred. ${mockError}`,
      });
    });
  });

  // Get member by ID
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
      expect(memberService.getById).toHaveBeenCalledWith(mockRequest.params.id);
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

  describe('deleteMemberById', () => {
    it('should delete member and return 204 when member present', async () => {
      const mockRequest = { params: { id: 1 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await deleteMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(memberService.deleteById).toHaveBeenCalledWith(
        mockRequest.params.id,
      );
    });

    it('should return a 404 error with an invalid id', async () => {
      const req = { params: { id: 'invalid' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      memberService.deleteById = jest
        .fn()
        .mockRejectedValue(new Error('Member not found'));

      await deleteMemberById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Error: Member not found',
      });
    });
  });
});
