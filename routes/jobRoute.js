const express = require('express');

const {
  createJob,
  updateJob,
} = require('../controllers/jobController');

const {
  createJobValidator,
  updateJobValidator,
} = require('../utils/validators/jobValidator');


const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, allowedTo('HR'), createJobValidator, createJob);

router
  .route('/:id')
  .put(isAuth, allowedTo('HR'), updateJobValidator, updateJob);

module.exports = router;
