const request = require('supertest');

const app = require('../../../app');

const models = require('../../models');

const Members = models.members;

const memberPayload = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'jd@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  join_date: '2023-01-01T00:00:00.000Z',
  renewal_date: '2024-01-01T00:00:00.000Z',
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
  joinDate: '01/01/23',
  renewalDate: '01/01/24',
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
            expect(res.body[0].first_name).toBe(memberInput.firstName);
          });
      });
      it('should return the member payload', async () => {
        const { statusCode, body } = await request(app)
          .post('/members')
          .send(memberInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(memberPayload);
      });
    });
    describe('given invalid entries', () => {
      it('should fail with code 400 and error message when given nothing', async () => {
        const response = await request(app).post('/members').send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'All fields required');
      });

      xit('should fail with error when first name is not given', async () => {
        const response = await request(app)
          .post('/members')
          .send({ ...memberInput, firstName: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
          message: 'Name must not be empty!',
        });
      });
    });
  });

  afterAll(async () => {
    await models.sequelize.close();
  });
});
