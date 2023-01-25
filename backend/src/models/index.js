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
    config
  );
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require('./member.model')(sequelize, Sequelize);

module.exports = db;
