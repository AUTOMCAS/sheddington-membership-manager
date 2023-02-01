// const MemberController = require('../../../controllers/member.controller');

// jest.mock('../../../models/member.model', () => () => {
//   const SequelizeMock = require('sequelize-mock');
//   const dbMock = new SequelizeMock();
//   return dbMock.define('member', {
//     firstName: 'John',
//     secondName: 'Doe',
//     email: 'jd@example.com',
//     telephone: '1234567890',
//     address: '12 example address',
//     gender: 'M',
//     joinDate: '01/01/23',
//     renewalDate: '01/01/24',
//   });
// });

// xdescribe('Test Sequelize Mocking', () => {
//   it('Should get value from mock', async () => {
//     const user = await MemberController.findOne();
//     expect(user.firstName).toEqual('good');
//   });
// });

// const { match, stub, resetHistory } = require('sinon');
// const proxyquire = require('proxyquire');

// const { makeMockModels } = require('sequelize-test-helpers');

// describe('src/utils/save', () => {
//   const User = { findOne: stub() };
//   const mockModels = makeMockModels({ User });

//   const save = proxyquire('../../../src/utils/save', {
//     '../models': mockModels,
//   });

//   const id = 1;
//   const data = {
//     firstName: 'John',
//     secondName: 'Doe',
//     email: 'jd@example.com',
//     telephone: '1234567890',
//     address: '12 example address',
//     gender: 'M',
//     joinDate: '01/01/23',
//     renewalDate: '01/01/24',
//   };
//   const fakeUser = { id, ...data, update: stub() };

//   let result;

//   describe('user does not exist', () => {
//     beforeAll(async () => {
//       User.findOne.resolves(undefined);
//       result = await save({ id, ...data });
//     });

//     afterAll(resetHistory);

//     it('called User.findOne', () => {
//       expect(User.findOne).to.have.been.calledWith(match({ where: { id } }));
//     });

//     // it("didn't call user.update", () => {
//     //   expect(fakeUser.update).not.to.have.been.called
//     // })

//     // it('returned null', () => {
//     //   expect(result).to.be.null
//     // })
//   });
// });
