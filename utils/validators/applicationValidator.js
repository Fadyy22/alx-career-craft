const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createApplicationValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid job id format'),
  check('userTechSkills')
    .isArray({ min: 1 })
    .withMessage('At least one tech skill is required'),
  check('userSoftSkills')
    .isArray({ min: 1 })
    .withMessage('At least one soft skill is required'),
  validatorMiddleware,
];

exports.getAllApplicationsValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid job id format'),
  validatorMiddleware,
];
