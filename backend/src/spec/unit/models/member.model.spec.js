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
    checkModelName(Member)('member');
  });

  describe('Contains all properties', () => {
    const member = new Member();
    [
      'firstName',
      'lastName',
      'email',
      'telephone',
      'address',
      'gender',
      'interests',
      'medicalInformation',
      'accessibilityRequirements',
      'joinDate',
      'renewalDate',
    ].forEach(checkPropertyExists(member));
  });
});
