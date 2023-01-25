module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Member',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.TEXT,
      telephone: DataTypes.TEXT,
      address: DataTypes.TEXT,
      gender: DataTypes.STRING,
      join_date: DataTypes.DATEONLY,
      renewal_date: DataTypes.DATEONLY,
    },
    {
      freezeTableName: true,
      classMethods: {
        associate(models) {
          // eslint-disable-line no-unused-vars
          // associations can be defined here
        },
      },
    }
  );
  return Member;
};

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class member extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     // static associate(models) {
//     //   // define association here
//     // }
//   }
//   member.init(
//     {
//       first_name: DataTypes.STRING,
//       last_name: DataTypes.STRING,
//       email: DataTypes.TEXT,
//       telephone: DataTypes.TEXT,
//       address: DataTypes.TEXT,
//       gender: DataTypes.STRING,
//       join_date: DataTypes.DATEONLY,
//       renewal_date: DataTypes.DATEONLY,
//     },
//     {
//       sequelize,
//       modelName: 'member',
//     }
//   );
//   return member;
// };
