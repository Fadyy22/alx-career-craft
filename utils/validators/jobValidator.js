const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Job = require('../../models/jobModel');

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

exports.updateJobValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid job id format.')
    .bail()
    .custom(async (id, { req }) => {
      const job = await Job.findById(id);
      if (!job) {
        return Promise.reject(new Error('Job not found.'));
      }

      if (job.addedBy.toString() !== req.user._id.toString()) {
        return Promise.reject(new Error('Not authorized to update this job.'));
      }
    }),
  check('jobTitle')
    .optional()
    .notEmpty()
    .withMessage('Please enter a job title')
    .isLength({ min: 3, max: 50 })
    .withMessage('Job title must be between 3 and 50 characters'),
  check('jobLocation')
    .optional()
    .notEmpty()
    .withMessage('Please enter a job location')
    .isIn(['Onsite', 'Remotely', 'Hybrid'])
    .withMessage('Job location must be Onsite, Remotely or Hybrid'),
  check('workingTime')
    .optional()
    .notEmpty()
    .withMessage('Please enter a working time')
    .isIn(['Part-Time', 'Full-Time'])
    .withMessage('Working time must be Part-Time or Full-Time'),
  check('seniorityLevel')
    .optional()
    .notEmpty()
    .withMessage('Please enter a seniority level')
    .isIn(['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'])
    .withMessage('Seniority level must be Junior, Mid-Level, Senior, Team-Lead or CTO'),
  check('jobDescription')
    .optional()
    .notEmpty()
    .withMessage('Please enter a job description')
    .isLength({ min: 50, max: 1000 })
    .withMessage('Job description must be between 50 and 1000 characters'),
  check('technicalSkills')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Please enter at least one technical skill'),
  check('softSkills')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Please enter at least one soft skill'),
  validatorMiddleware,
];

exports.deleteJobValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid job id format.')
    .bail()
    .custom(async (id, { req }) => {
      const job = await Job.findById(id);
      if (!job) {
        return Promise.reject(new Error('Job not found.'));
      }

      if (job.addedBy.toString() !== req.user._id.toString()) {
        return Promise.reject(new Error('Not authorized to delete this job.'));
      }
    }),
  validatorMiddleware,
];
