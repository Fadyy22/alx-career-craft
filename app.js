const express = require('express');
const dotenv = require('dotenv');

const dbConnection = require('./config/database');
const mountRoutes = require('./routes');

dotenv.config();

const app = express();

app.use(express.json({ limit: '20kb' }));

mountRoutes(app);

dbConnection(app);
