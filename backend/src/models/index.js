const Sequelize = require('sequelize');
//const dbConfig = require('../config/db.config');
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config')[env];
const config = require('../config/db.config')[env];

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

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: 0,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require('./member.model')(sequelize, Sequelize);

module.exports = db;
