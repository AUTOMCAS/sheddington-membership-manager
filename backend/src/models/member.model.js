module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define('Member', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    second_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    joinDate: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    renewalDate: {
      type: Sequelize.DATEONLY,
    },
  });

  return Member;
};
