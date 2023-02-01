const request = require('supertest');

const app = require('../../../app');

const models = require('../../models');

describe('GET /', () => {
  it('responds with a 200', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Welcome!' }, done);
  });

  afterAll(async () => {
    await models.sequelize.close();
  });
});
