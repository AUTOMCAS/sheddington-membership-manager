// const request = require('supertest');
// const app = require('../../app');

// const db = require('../models/index');

// describe('GET /', () => {
//   const thisDb = db;
//   beforeAll(async () => {
//     await thisDb.sequelize.sync({ force: true });
//   });
//   it('responds with a 404 and error message in json', (done) => {
//     request(app)
//       .get('/')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, { message: 'Welcome!' }, done);
//   });
//   afterAll(async () => {
//     await thisDb.sequelize.close();
//   });
// });
