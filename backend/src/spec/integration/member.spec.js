const request = require('supertest');

const app = require('../../../app');

const db = require('../../models');

const Members = db.members;

const expectedMemberResponse = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'jd@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  newEmergencyContact: {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  },
};

const memberInput = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'jd@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  emergencyContact: {
    firstName: 'Jane',
    lastName: 'Doe',
    telephone: '1234123412',
    relationship: 'Partner',
  },
};

describe('/members routes', () => {
  const thisDb = db;

  afterEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  afterAll(async () => {
    await thisDb.sequelize.close();
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
    xit('should return member by ID', async () => {
      await request(app).post('/members').send(memberInput);

      const id = 1;
      const response = await request(app).get(`/members/${id}`);

      const { createdMember, createdEmergencyContact } = response.body;
      expect(response.statusCode).toBe(200);
      expect(createdMember).toMatchObject(
        expectedMemberResponse.createdMember,
        {
          ignore: ['createdAt', 'updatedAt', 'createdEmergencyContact'],
        },
      );
      expect(createdEmergencyContact).toMatchObject(
        expectedMemberResponse.createdEmergencyContact,
      );
    });
  });

  // Create members
  describe('POST /members, create a member', () => {
    describe('given valid entries', () => {
      it('should return the member payload', async () => {
        const response = await request(app).post('/members').send(memberInput);
        const createdMember = response.body;

        expect(response.statusCode).toBe(200);
        expect(createdMember).toMatchObject(expectedMemberResponse, {
          ignore: ['createdAt', 'updatedAt', 'newEmergencyContact'],
        });

        expect(createdMember.newEmergencyContact).toMatchObject(
          expectedMemberResponse.newEmergencyContact,
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
      await request(app).post('/members').send(memberInput);
      const response = await request(app).post('/members').send(memberInput);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: 'Error: Email must be unique',
      });
    });

    it('should fail with error when entry is not present', async () => {
      const updatedMember = {
        ...memberInput,
        firstName: '',
      };
      const response = await request(app).post('/members').send(updatedMember);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "Error: Member's firstName cannot be empty string",
      });
    });
  });
});
