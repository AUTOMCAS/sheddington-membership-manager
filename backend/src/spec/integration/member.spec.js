const request = require('supertest');

const app = require('../../app');

const models = require('../../models');

const Members = models.members;

const expectedMemberResponse = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'js@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  interests: ['Making and Mending', 'Gardening'],
  medicalConditions: ['Lower body paralysis'],
  specialRequirements: ['Wheelchair access'],
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

const memberInput = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'js@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  interests: ['Making and Mending', 'Gardening'],
  medicalConditions: ['Lower body paralysis'],
  specialRequirements: ['Wheelchair access'],
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  emergencyContact: {
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
  },
};

describe('/members', () => {
  afterEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  afterAll(async () => {
    await models.sequelize.close();
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
      console.log(response.body);

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
