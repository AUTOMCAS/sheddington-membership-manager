// Takes all models and applies to db object

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

let sequelize = '';
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require('./member.model')(sequelize, Sequelize);
db.emergencyContacts = require('./emergencyContact.model')(
  sequelize,
  Sequelize,
);

db.emergencyContacts.belongsTo(db.members, {
  foreignKey: { name: 'member_id', allowNull: false },
  onDelete: 'CASCADE',
});
db.members.hasMany(db.emergencyContacts, {
  foreignKey: { name: 'member_id', allowNull: false },
  onDelete: 'CASCADE',
});

db.sequelize.sync({ force: false });

module.exports = db;
