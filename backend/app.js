const express = require('express');
const cors = require('cors');

const memberRouter = require('./src/routes/member.routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./src/models');

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome!' });
});

// route setup
app.use('/members', memberRouter);

module.exports = app;
