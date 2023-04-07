const request = require('supertest');

const app = require('../../app');

const models = require('../../models');

const Members = models.members;

const {
  expectedMemberResponse,
  memberData,
  expectedMemberResponseById,
} = require('../testData');

describe('/members', () => {
  afterEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  afterAll(async () => {
    await models.sequelize.close();
  });

  // Create member
  describe('POST /members, create a member', () => {
    describe('given valid entries', () => {
      it('should return the member payload', async () => {
        const response = await request(app).post('/members').send(memberData);
        const createdMember = response.body;

        expect(response.statusCode).toBe(200);
        expect(createdMember).toMatchObject(expectedMemberResponse, {
          ignore: ['createdAt', 'updatedAt', 'newEmergencyContact'],
        });

        expect(createdMember.createdEmergencyContact).toMatchObject(
          expectedMemberResponse.createdEmergencyContact,
          {
            ignore: ['createdAt', 'updatedAt'],
          },
        );
      });
    });
  });

  describe('given invalid entries', () => {
    it('should fail with code 400 and error message when given nothing', async () => {
      const response = await request(app).post('/members').send();
      expect(response.statusCode).toBe(400);
    });

    it('should fail when duplicate email already exists', async () => {
      await request(app).post('/members').send(memberData);
      const response = await request(app).post('/members').send(memberData);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: 'Error: Email must be unique',
      });
    });

    it('should fail with error when entry is not present', async () => {
      const updatedMember = {
        ...memberData,
        firstName: '',
      };
      const response = await request(app).post('/members').send(updatedMember);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "Error: Member's firstName cannot be empty string",
      });
    });
  });

  // Get all members
  describe('GET /members, get all members', () => {
    it('should respond with a 200', async () => {
      const response = await request(app).get('/members');
      expect(response.statusCode).toBe(200);
    });
    it('should initially respond with an empty member list', async () => {
      const { body } = await request(app).get('/members');
      expect(body).toEqual([]);
    });
  });

  // Get member by ID
  describe('GET /members/:id, get member by ID', () => {
    it('should return member by ID', async () => {
      await request(app).post('/members').send(memberData);

      const id = 1;
      const response = await request(app).get(`/members/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(expectedMemberResponseById, {
        ignore: ['createdAt', 'updatedAt'],
      });
    });
  });
});
