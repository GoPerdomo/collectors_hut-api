const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config');
const routes = require('./routes/index');

// Use Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);
// Use Middlewares

// Connect to DB
mongoose.connect(config.database, { useMongoClient: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to the database');
});
// Connect to DB

// Catch 404 Error
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
// Catch 404 Error

// Error Handler
app.use((err, req, res, next) => {
  if(err.status === undefined) err.status = 500
  res.locals.error = err;
  res.status(err.status);
  res.json(err.message);
});
// Error Handler

// Listen to port
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}!`);
});
// Listen to port
