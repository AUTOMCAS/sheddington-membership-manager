const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const MemberModel = require('../../../models/member.model');

describe('Member model', () => {
  const Member = MemberModel(sequelize, dataTypes);
  describe('Has correct model name', () => {
    checkModelName(Member)('Member');
  });

  describe('Contains all properties', () => {
    const member = new Member();
    [
      'first_name',
      'last_name',
      'email',
      'telephone',
      'address',
      'gender',
      'join_date',
      'renewal_date',
    ].forEach(checkPropertyExists(member));
  });

  // it('has an email address', () => {
  //   const member = new Member({
  //     firstName: 'John',
  //     secondName: 'Doe',
  //     email: 'jd@example.com',
  //     telephone: '1234567890',
  //     address: '12 example address',
  //     gender: 'M',
  //     joinDate: '01/01/23',
  //     renewalDate: '01/01/24',
  //   });
  //   expect(member.email).toEqual('someone@example.com');
  // });
});
