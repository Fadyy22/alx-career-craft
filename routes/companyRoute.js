const express = require('express');

const {
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const {
  createCompanyValidator,
  updateCompanyValidator,
} = require('../utils/validators/companyValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, allowedTo('HR'), createCompanyValidator, createCompany)
  .put(isAuth, allowedTo('HR'), updateCompanyValidator, updateCompany)
  .delete(isAuth, allowedTo('HR'), deleteCompany);

module.exports = router;
