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
db.emergencyContact = require('./emergencyContact.model')(sequelize, Sequelize);

db.emergencyContact.belongsTo(db.members, {
  foreignKey: 'member_id',
});
db.members.hasMany(db.emergencyContact, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE',
});

db.sequelize.sync({ force: true });

module.exports = db;
