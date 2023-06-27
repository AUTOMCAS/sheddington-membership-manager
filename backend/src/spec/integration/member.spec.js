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
  beforeEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  afterAll(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
    await models.sequelize.close();
  });

  // Create member
  describe('POST /members, create a member', () => {
    describe('given valid entries', () => {
      it('should return the member payload', async () => {
        const response = await request(app).post('/members').send(memberData);
        const createdMember = response.body;

        expect(response.statusCode).toBe(201);
        expect(createdMember).toMatchObject(expectedMemberResponse, {
          ignore: ['createdAt', 'updatedAt', 'newEmergencyContact'],
        });

        expect(createdMember.createdEmergencyContacts).toMatchObject(
          expectedMemberResponse.createdEmergencyContacts,
          {
            ignore: ['createdAt', 'updatedAt'],
          },
        );
      });
    });
  });

  describe('given invalid entries', () => {
    it('should fail with code 409 and error message when given empty input', async () => {
      const response = await request(app).post('/members').send();
      expect(response.statusCode).toBe(409);
    });

    it('should fail when duplicate email already exists', async () => {
      await request(app).post('/members').send(memberData);
      const response = await request(app).post('/members').send(memberData);
      expect(response.statusCode).toBe(409);
      expect(response.body).toMatchObject({
        message: 'Email must be unique',
      });
    });

    it('should fail with error when entry is not present', async () => {
      const updatedMember = {
        ...memberData,
        firstName: '',
      };
      const response = await request(app).post('/members').send(updatedMember);
      expect(response.statusCode).toBe(409);
      expect(response.body).toMatchObject({
        message: "Member's firstName cannot be empty string",
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

  // Update member by ID
  describe('/PUT /members/:id, update member by id', () => {
    it('should update a member', async () => {
      // Create member to be updated
      await request(app).post('/members').send(memberData);

      const updatedMemberData = { firstName: 'Chris' };

      const id = 1;
      const response = await request(app)
        .put(`/members/${id}`)
        .send(updatedMemberData);

      expect(response.statusCode).toBe(204);
    });

    it('should respond with 404 and error message when member not found', async () => {
      const id = 5;

      const updatedMemberData = { firstName: 'Chris' };

      const response = await request(app)
        .put(`/members/${id}`)
        .send(updatedMemberData);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Member with that ID not found');
    });

    it('should respond with 400 when emergencyContact is given in request body', async () => {
      // Create member to be updated
      await request(app).post('/members').send(memberData);

      const updatedMemberData = { ...memberData, firstName: 'Chris' };

      const id = 1;
      const response = await request(app)
        .put(`/members/${id}`)
        .send(updatedMemberData);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Do not include emergencyContacts');
    });
  });

  // Delete a member
  describe('DELETE /members/:id, delete member by ID', () => {
    it('should delete a member by ID', async () => {
      await request(app).post('/members').send(memberData);

      const id = 1;

      const response = await request(app).delete(`/members/${id}`);
      expect(response.statusCode).toBe(204);
    });

    it('should respond with 404 and error message when member not found', async () => {
      const id = 1;

      const response = await request(app).delete(`/members/${id}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Member with that ID not found');
    });
  });
});
