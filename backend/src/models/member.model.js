module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define('Member', {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    joinDate: {
      type: Sequelize.DATEONLY,
    },
    renewalDate: {
      type: Sequelize.DATEONLY,
    },
  });

  return Member;
};
