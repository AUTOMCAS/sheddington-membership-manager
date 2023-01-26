const request = require('supertest');

const app = require('../../../app');

const db = require('../../models');

const Members = db.members;

describe('/members routes', () => {
  const thisDb = db;
  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });
  beforeEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  describe('GET /members', () => {
    it('responds with a 200 and empty member list', (done) => {
      request(app)
        .get('/members')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [], done);
    });
  });

  describe('POST /members', () => {
    it('the response code is 200 with correct entries', async () => {
      const response = await request(app).post('/members').send({
        firstName: 'John',
        secondName: 'Doe',
        email: 'jd@example.com',
        telephone: '1234567890',
        address: '12 example address',
        gender: 'M',
        joinDate: '01/01/23',
        renewalDate: '01/01/24',
      });
      expect(response.statusCode).toBe(200);
    });
    it('creates a new user on db', async () => {
      const memberExample = {
        firstName: 'John',
        secondName: 'Doe',
        email: 'jd@example.com',
        telephone: '1234567890',
        address: '12 example address',
        gender: 'M',
        joinDate: '01/01/23',
        renewalDate: '01/01/24',
      };
      await request(app).post('/members').send(memberExample);

      await request(app)
        .get('/members')
        .then((res) => {
          expect(res.body[0].id).toBe(1);
          expect(res.body[0].first_name).toBe('John');
        });
    });
  });
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
