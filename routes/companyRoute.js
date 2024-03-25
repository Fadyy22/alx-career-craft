const express = require('express');

const {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
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

router
  .route('/:id')
  .get(isAuth, allowedTo('HR'), getCompany);

module.exports = router;
