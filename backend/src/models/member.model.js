module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstName: { type: DataTypes.STRING, field: 'first_name' },
    lastName: { type: DataTypes.STRING, field: 'last_name' },
    email: DataTypes.TEXT,
    telephone: DataTypes.TEXT,
    address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    joinDate: {
      type: DataTypes.DATEONLY,
      field: 'join_date',
    },
    renewalDate: { type: DataTypes.DATE, field: 'renewal_date' },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  });
  return Member;
};
