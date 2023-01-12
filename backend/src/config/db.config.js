// module.exports = {
//   HOST: 'localhost',
//   USER: 'cas',
//   PASSWORD: 'password',
//   DB: 'sheddington_membership_directory',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

module.exports = {
  development: {
    username: 'cas',
    password: null,
    database: 'sheddington_membership_directory',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: 'cas',
    password: null,
    database: 'sheddington_membership_directory_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
};
