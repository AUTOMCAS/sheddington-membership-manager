// module.exports = (sequelize, Sequelize) => {
//   const Member = sequelize.define('Member', {
//     firstName: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     secondName: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     telephone: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: Sequelize.STRING,
//     },
//     gender: {
//       type: Sequelize.STRING,
//     },
//     joinDate: {
//       allowNull: false,
//       type: Sequelize.DATEONLY,
//     },
//     renewalDate: {
//       type: Sequelize.DATEONLY,
//     },
//   });

//   return Member;
// };