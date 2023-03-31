const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const EmergencyContatModel = require('../../../models/emergencyContact.model');

describe('EmergencyContact model', () => {
  const EmergencyContact = EmergencyContatModel(sequelize, dataTypes);
  describe('Has correct model name', () => {
    checkModelName(EmergencyContact)('Emergency Contact');
  });

  describe('Contains all properties', () => {
    const emergencyContact = new EmergencyContact();
    ['firstName', 'lastName', 'relationship', 'telephone'].forEach(
      checkPropertyExists(emergencyContact),
    );
  });
});
