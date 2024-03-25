const express = require('express');
const dotenv = require('dotenv');

const ApiError = require('./utils/apiError');
const dbConnection = require('./config/database');
const mountRoutes = require('./routes');

dotenv.config();

const app = express();

app.use(express.json({ limit: '20kb' }));

mountRoutes(app);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 404));
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    error: error,
    message: error.message,
  });
});

dbConnection(app);
