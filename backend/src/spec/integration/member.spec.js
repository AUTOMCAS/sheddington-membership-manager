const request = require('supertest');

const app = require('../../../app');

const db = require('../../models');

const Members = db.members;

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
  // const thisDb = db;
  // beforeAll(async () => {
  //   await thisDb.sequelize.sync({ force: true });
  // });
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
      it('should fail with code 400', async () => {
        await request(app).post('/members').send(memberInput);
        const response = await request(app).post('/members').send(memberInput);

        expect(response.statusCode).toBe(400);
      });

      // xit('should fail with code 400', async () => {
      //   const response = await request(app).post('/members').send({});
      //   console.log(response.statusCode);

      //   expect(response.statusCode).toBe(400);
      // });

      // xit('should fail with error when no content is given', async () => {
      //   const response = await request(app).post('/members').send();
      //   expect(response.statusCode).toBe(400);
      //   expect(response.body).toMatchObject({
      //     message: 'Content must not be empty!',
      //   });
      // });

      // xit('should fail with error when first name is not given', async () => {
      //   const response = await request(app)
      //     .post('/members')
      //     .send({ ...memberInput, firstName: '' });
      //   expect(response.statusCode).toBe(400);
      //   expect(response.body).toMatchObject({
      //     message: 'Name must not be empty!',
      //   });
      // });
    });
  });
  // afterAll(async () => {
  //   await thisDb.sequelize.close();
  // });
});
