const express = require('express');

const {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanies,
  createFilterObj,
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
  .patch(isAuth, allowedTo('HR'), updateCompanyValidator, updateCompany)
  .delete(isAuth, allowedTo('HR'), deleteCompany)
  .get(createFilterObj, getCompanies);

router
  .route('/:id')
  .get(getCompany);

module.exports = router;
