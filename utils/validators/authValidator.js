const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.signupValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('Please enter your first name.')
    .isString()
    .withMessage('Please enter your first name with only characters.'),
  check('lastName')
    .notEmpty()
    .withMessage('Please enter your last name.')
    .isString()
    .withMessage('Please enter your last name with only characters.'),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .bail()
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error('email already exists.');
      }
      return true;
    }),
  check('password')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must have a minimum length of 8 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character.'),
  check('DOB')
    .notEmpty()
    .withMessage('Please enter your birth date.')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Please enter your birth date in YYYY-MM-DD format.'),
  check('mobileNumber')
    .isMobilePhone()
    .withMessage('Please enter a valid mobile number.')
    .bail()
    .custom(async (val) => {
      const user = await User.findOne({ mobileNumber: val });
      if (user) {
        return Promise.reject(new Error('mobile number already exists.'));
      }
      return true;
    }),
  check('role')
    .notEmpty()
    .withMessage('Please enter your role.')
    .isIn(['USER', 'HR'])
    .withMessage('Role must be either USER or HR.'),
  validatorMiddleware,
];

exports.loginValidator = [
  check('username')
    .notEmpty()
    .withMessage('Please enter your email or mobile number.'),
  check('password')
    .notEmpty()
    .withMessage('Please enter your password.'),
  validatorMiddleware
];

exports.forgotPasswordValidator = [
  check('email')
    .notEmpty()
    .withMessage('Please enter your email.')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  validatorMiddleware
];

exports.verifyPasswordResetCodeValidator = [
  check('resetCode', 'Invalid or expired password reset code.')
    .isNumeric()
    .isLength({ min: 6, max: 6 }),
  validatorMiddleware
];

exports.resetPasswordValidator = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  check('password')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must have a minimum length of 8 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character.'),
  check('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your password.')
    .custom((val, { req }) => {
      if (req.body.password !== val) {
        throw new Error('Passwords don\'t match.');
      }
      return true;
    }),
  validatorMiddleware
];
