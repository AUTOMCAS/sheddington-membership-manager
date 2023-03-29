const request = require('supertest');

const app = require('../../../app');

const models = require('../../models');

const Members = models.members;

const memberPayload = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'jd@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
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
};

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('/members routes', () => {
  afterEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
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
      it('should create a new member in the database', async () => {
        await request(app).post('/members').send(memberInput);

        await request(app)
          .get('/members')
          .then((res) => {
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].firstName).toBe(memberInput.firstName);
          });
      });
      it('should return the member payload', async () => {
        const response = await request(app).post('/members').send(memberInput);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(memberPayload);
      });
    });
    describe('given invalid entries', () => {
      it('should fail with code 400 and error message when given nothing', async () => {
        const response = await request(app).post('/members').send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'All fields required');
      });
      it('should fail when duplicate email already exists', async () => {
        await request(app).post('/members').send(memberInput);
        const response = await request(app).post('/members').send(memberInput);

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
          message: 'Error: Email must be unique',
        });
      });
      it('should fail with error when firstName is not present', async () => {
        const response = await request(app)
          .post('/members')
          .send({ ...memberInput, firstName: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
          message: 'Error: firstName cannot be empty',
        });
      });
      it('should fail with error when lastName is not present', async () => {
        const response = await request(app)
          .post('/members')
          .send({ ...memberInput, lastName: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
          message: 'Error: lastName cannot be empty',
        });
      });
    });
  });

  afterAll(async () => {
    await models.sequelize.close();
  });
});
