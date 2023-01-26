const supertest = require('supertest');

const app = require('../../../app');

const db = require('../../models');

const MemberController = require('../../controllers/member.controller');

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
  const thisDb = db;
  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });
  beforeEach(async () => {
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  describe('GET /members, get all members', () => {
    it('should respond with a 200', async () => {
      const { statusCode } = await supertest(app).get('/members');

      expect(statusCode).toBe(200);
    });
    it('should initially respond with an empty member list', async () => {
      const { body } = await supertest(app).get('/members');

      expect(body).toEqual([]);
    });
  });

  describe('POST /members, create a member', () => {
    describe('given valid entries', () => {
      it('should return the member payload', async () => {
        const createMemberControllerMock = jest
          .spyOn(MemberController, 'Create')
          .mockReturnValueOnce(memberPayload);

        const { statusCode, body } = await supertest(app)
          .post('/members')
          .send(memberInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(memberPayload);

        expect(createMemberControllerMock).toHaveBeenCalled();
        //With(memberInput);
      });
      it('should succeed with code 200', async () => {
        const response = await supertest(app).post('/members').send({
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
      it('should creates a new member', async () => {
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
        await supertest(app).post('/members').send(memberExample);

        await supertest(app)
          .get('/members')
          .then((res) => {
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].first_name).toBe('John');
          });
      });
    });

    xit('should fail with code 400 with missing entries', async () => {
      const response = await supertest(app).post('/members').send({
        name: 'John',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: 'Invalid token.',
      });
    });
  });
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
