const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logRequest } = require('./utils/logger');
const memberRouter = require('./routes/member.routes');
const emergencyContactRouter = require('./routes/emergencyContact.routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('env');
console.log('Environment: ', process.env.NODE_ENV);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// logger
app.use(logRequest);

// route setup
app.get('/', (req, res) => {
  res.json({ message: 'Welcome!' });
});
app.use('/members', memberRouter);
app.use('/emergencyContacts', emergencyContactRouter);

module.exports = app;
