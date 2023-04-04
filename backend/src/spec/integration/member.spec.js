const request = require('supertest');

const app = require('../../../app');

const db = require('../../models');

const Members = db.members;

const expectedMemberPayload = {
  createdMember: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd@example.com',
    telephone: '1234567890',
    address: '12 example address',
    gender: 'M',
    joinDate: '2023-12-01T00:00:00.000Z',
    renewalDate: '2024-12-01T00:00:00.000Z',
  },
  createdEmergencyContact: {
    id: 1,
    firstName: 'Some',
    lastName: 'One',
    telephone: '1234123412',
    relationship: 'Friend',
    member_id: 1,
  },
};

const memberInput = {
  member: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd@example.com',
    telephone: '1234567890',
    address: '12 example address',
    gender: 'M',
    joinDate: '2023-12-01T00:00:00.000Z',
    renewalDate: '2024-12-01T00:00:00.000Z',
  },
  emergencyContact: {
    firstName: 'Some',
    lastName: 'One',
    telephone: '1234123412',
    relationship: 'Friend',
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

  describe('POST /members, create a member', () => {
    describe('given valid entries', () => {
      it('should return the member payload', async () => {
        const response = await request(app).post('/members').send(memberInput);
        const { createdMember, createdEmergencyContact } = response.body;

        expect(response.statusCode).toBe(200);
        expect(createdMember).toMatchObject(
          expectedMemberPayload.createdMember,
          {
            ignore: ['createdAt', 'updatedAt'],
          },
        );
        expect(createdEmergencyContact).toMatchObject(
          expectedMemberPayload.createdEmergencyContact,
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
      const { member, emergencyContact } = memberInput;

      const updatedMember = {
        member: {
          ...member,
          firstName: '',
        },
        emergencyContact,
      };

      const response = await request(app).post('/members').send(updatedMember);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "Error: Member's firstName cannot be empty string",
      });
    });
  });
});
