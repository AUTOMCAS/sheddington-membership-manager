const request = require('supertest');

const app = require('../../../app');

describe('GET /', () => {
  it('responds with a 200', () => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
