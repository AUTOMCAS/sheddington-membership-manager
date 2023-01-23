module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define('Member', {
    first_name: {
      type: Sequelize.STRING,
    },
    second_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        name: 'member_email',
        msg: 'A member with this email already exists.',
      },
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
