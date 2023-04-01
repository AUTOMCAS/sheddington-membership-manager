const request = require('supertest');

const app = require('../../../app');

const db = require('../../models');

describe('GET /', () => {
  const thisDb = db;
  it('responds with a 200', () => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
