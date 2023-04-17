const memberService = require('../../../services/member.service');
const { expectedMemberResponse, memberData } = require('../../testData');
const { validateMemberData } = require('../../../utils/validation');

jest.mock('../../../services/member.service');
jest.mock('../../../utils/validation');

const {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMemberById,
} = require('../../../controllers/member.controller');

describe('member controller', () => {
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

    it('should return 500 status for unexpected errors', async () => {
      const mockError = new Error('An unknown error occurred.');

      memberService.getAll.mockRejectedValue(mockError);

      const mockRequest = {};
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllMembers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Unexpected server error',
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

        validateMemberData.mockResolvedValue(null);

        memberService.create = jest
          .fn()
          .mockResolvedValue(expectedMemberResponse);

        await createMember(memberData, mockResponse);

        expect(memberService.create).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedMemberResponse);
        expect(mockResponse.send).not.toHaveBeenCalled();
      });

      it('should return 500 status code for unexpected server error', async () => {
        const mockError = new Error('Unknown error occurred');
        memberService.create.mockRejectedValue(mockError);

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        await createMember(memberData, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalled();
      });

      it('should return 409 status code and error message if email is not unique', async () => {
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn(),
        };
        const mockError = new Error(
          'SequelizeUniqueConstraintError: Validation error',
        );

        memberService.create = jest.fn().mockRejectedValue(mockError);

        await createMember(memberData, mockResponse);

        expect(memberService.create).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: 'Email must be unique',
        });
      });

      it('should return 409 status code and error message if emergency contacts missing', async () => {
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn(),
        };
        const mockError = new Error('Emergency Contacts missing');
        mockError.code = 'EMERGENCY_CONTACTS_MISSING';

        validateMemberData.mockRejectedValue(mockError);

        await createMember(memberData, mockResponse);

        expect(memberService.create).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: 'Emergency Contacts missing',
        });
      });

      it('should return 409 status code and error message if entries are empty', async () => {
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn(),
        };
        const mockError = new Error(
          "Members's firstName cannot be empty string",
        );
        mockError.code = 'EMPTY_ENTRY';

        validateMemberData.mockRejectedValue(mockError);

        await createMember(memberData, mockResponse);

        expect(memberService.create).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "Members's firstName cannot be empty string",
        });
      });
    });

    it('should return 404 status if member not found', async () => {
      memberService.getById.mockResolvedValue(null);

      const mockRequest = { params: { id: 1 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Member not found',
      });
    });

    it('should return 500 status for unexpected error', async () => {
      const mockError = new Error('Unknown error occurred');
      memberService.getById.mockRejectedValue(mockError);

      const mockRequest = { params: { id: 1 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  // Delete member by ID
  describe('deleteMemberById', () => {
    it('should delete member and return 204 when member present', async () => {
      const mockRequest = { params: { id: 1 } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      await deleteMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(memberService.deleteById).toHaveBeenCalledWith(
        mockRequest.params.id,
      );
    });

    it('should return a 404 error with an invalid id', async () => {
      const mockRequest = { params: { id: 'invalid' } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      memberService.deleteById = jest.fn().mockResolvedValue(0);

      await deleteMemberById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Member not found',
      });
    });
  });
});
