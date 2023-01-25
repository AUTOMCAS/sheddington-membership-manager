module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      },
      gender: {
        type: Sequelize.STRING,
      },
      join_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      renewal_date: {
        type: Sequelize.DATE,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Members');
  },
};
