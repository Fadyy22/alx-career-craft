const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.getUserProfileValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid user id format.'),
  validatorMiddleware
];

exports.updateUserValidator = [
  check('firstName')
    .optional()
    .isString()
    .withMessage('Please enter your first name with only characters.'),
  check('lastName')
    .optional()
    .isString()
    .withMessage('Please enter your last name with only characters.'),
  check('bio')
    .optional()
    .isLength({ min: 10, max: 250 })
    .withMessage('Bio must be between 10 and 250 characters'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email.')
    .bail()
    .custom(async (val, { req }) => {
      const user = await User.findOne({ email: val });
      if (user && user._id.toString() !== req.user._id.toString()) {
        return Promise.reject(new Error('email already exists.'));
      }
      return true;
    }),
  check('recoveryEmail')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email.'),
  check('DOB')
    .optional()
    .notEmpty()
    .withMessage('Please enter your birth date.')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Please enter your birth date in YYYY-MM-DD format.'),
  check('mobileNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please enter a valid mobile number.')
    .bail()
    .custom(async (val) => {
      const user = await User.findOne({ mobileNumber: val });
      if (user && user._id.toString() !== req.user._id.toString()) {
        return Promise.reject(new Error('mobile number already exists.'));
      }
      return true;
    }),
  validatorMiddleware
];
