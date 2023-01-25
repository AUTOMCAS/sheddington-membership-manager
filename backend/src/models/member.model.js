module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Members',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.TEXT,
      telephone: DataTypes.TEXT,
      address: DataTypes.TEXT,
      gender: DataTypes.STRING,
      join_date: DataTypes.DATE,
      renewal_date: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      // classMethods: {
      //   associate(models) {
      //     // eslint-disable-line no-unused-vars
      //     // associations can be defined here
      //   },
      // },
    }
  );
  return Member;
};
