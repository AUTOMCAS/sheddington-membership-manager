const request = require('supertest');

const app = require('../../../app');

const db = require('../../models');

describe('/members routes', () => {
  const thisDb = db;
  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
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
    const newMember = {
      first_name: 'John',
      second_name: 'Doe',
      email: 'jd@example.com',
      telephone: '1234567890',
      address: '12 example address',
      gender: 'M',
      join_date: '01/01/23',
      renewal_date: '01/01/24',
    };

    it('responds with a 201 and creates member', (done) => {
      request(app)
        .post('/members')
        .send(newMember)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
