const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Company = require('../../models/companyModel');

exports.createCompanyValidator = [
  check('companyName')
    .notEmpty()
    .withMessage('Please enter your company name.')
    .isLength({ max: 16 })
    .withMessage('The name you provided is too long.')
    .bail()
    .custom(async (val, { req }) => {
      const company = await Company.findOne({ $or: [{ companyName: val }, { companyHR: req.user._id }] });
      if (company && company.companyHR.toString() === req.user._id.toString()) {
        throw new Error('You have already created a company.');
      } else if (company) {
        throw new Error('Company already exists.');
      }
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Please enter your company description.')
    .isLength({ max: 200 })
    .withMessage('The description you provided is too long.'),
  check('industry')
    .notEmpty()
    .withMessage('Please enter your company industry.'),
  check('address')
    .notEmpty()
    .withMessage('Please enter your company address.'),
  check('numberOfEmployees.min')
    .notEmpty()
    .withMessage('Please enter your company minimum number of employees.')
    .isNumeric(),
  check('numberOfEmployees.max')
    .notEmpty()
    .withMessage('Please enter your company maximum number of employees.')
    .isNumeric()
    .custom((val, { req }) => {
      if (req.body.numberOfEmployees.min >= val) {
        throw new Error('Maximum number of employees must be greater than minimum.');
      }
      return true;
    }),
  check('companyEmail')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  validatorMiddleware
];
