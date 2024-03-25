const express = require('express');

const {
  createCompany,
} = require('../controllers/companyController');

const {
  createCompanyValidator,
} = require('../utils/validators/companyValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, allowedTo('HR'), createCompanyValidator, createCompany);


module.exports = router;
