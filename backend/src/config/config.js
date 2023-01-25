require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    database: 'sheddington_membership_directory',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    database: process.env.DB_TEST_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
};
