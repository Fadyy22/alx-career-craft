const bcrypt = require('bcryptjs');
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

exports.changePasswordValidator = [
  check('currentPassword')
    .notEmpty()
    .withMessage('Please enter your current password.'),
  check('newPassword')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must have a minimum length of 8 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character.'),
  check('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your password.')
    .bail()
    .custom(async (val, { req }) => {
      if (req.body.newPassword !== val) {
        throw new Error('Passwords don\'t match.');
      }
      const user = await User.findById(req.user._id);
      const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isCorrectPassword) {
        throw new Error('Incorrect current password.');
      }
      return true;
    }),
  validatorMiddleware
];
