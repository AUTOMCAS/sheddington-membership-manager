module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    telephone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    medicalInformation: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'medical_information',
    },
    accessibilityRequirements: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'accessibility_requirements',
    },
    joinDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'join_date',
    },
    renewalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'renewal_date',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  });

  return Member;
};
