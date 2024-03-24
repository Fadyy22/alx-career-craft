const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getUserProfileValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid user id format.'),
  validatorMiddleware
];
