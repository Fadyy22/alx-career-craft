const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createJobValidator = [
  check('jobTitle')
    .notEmpty()
    .withMessage('Please enter a job title')
    .isLength({ min: 3, max: 50 })
    .withMessage('Job title must be between 3 and 50 characters'),
  check('jobLocation')
    .notEmpty()
    .withMessage('Please enter a job location')
    .isIn(['Onsite', 'Remotely', 'Hybrid'])
    .withMessage('Job location must be Onsite, Remotely or Hybrid'),
  check('workingTime')
    .notEmpty()
    .withMessage('Please enter a working time')
    .isIn(['Part-Time', 'Full-Time'])
    .withMessage('Working time must be Part-Time or Full-Time'),
  check('seniorityLevel')
    .notEmpty()
    .withMessage('Please enter a seniority level')
    .isIn(['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'])
    .withMessage('Seniority level must be Junior, Mid-Level, Senior, Team-Lead or CTO'),
  check('jobDescription')
    .notEmpty()
    .withMessage('Please enter a job description')
    .isLength({ min: 50, max: 1000 })
    .withMessage('Job description must be between 50 and 1000 characters'),
  check('technicalSkills')
    .isArray({ min: 1 })
    .withMessage('Please enter at least one technical skill'),
  check('softSkills')
    .isArray({ min: 1 })
    .withMessage('Please enter at least one soft skill'),
  validatorMiddleware,
];
