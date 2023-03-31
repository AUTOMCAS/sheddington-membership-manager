const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logRequest } = require('./src/utils/logger');

const memberRouter = require('./src/routes/member.routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('env');
console.log(process.env.NODE_ENV);

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

module.exports = app;
