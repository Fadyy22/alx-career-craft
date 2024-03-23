const express = require('express');
const dotenv = require('dotenv');

const dbConnection = require('./config/database');

dotenv.config();

const app = express();

app.use(express.json({ limit: '20kb' }));

dbConnection(app);
