'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      telephone: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      interests: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false,
      },
      medicalInformation: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'medical_information',
      },
      accessibilityRequirements: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'accessibility_requirements',
      },
      joinDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'join_date',
      },
      renewalDate: {
        type: Sequelize.DATE,
        field: 'renewal_date',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  },
};
