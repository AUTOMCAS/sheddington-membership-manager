const models = require('../models');

afterAll(() => models.sequelize.close());
