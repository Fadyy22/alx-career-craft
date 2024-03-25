const express = require('express');

const {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  createFilterObj,
} = require('../controllers/jobController');

const {
  createJobValidator,
  updateJobValidator,
  deleteJobValidator,
} = require('../utils/validators/jobValidator');


const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router();

router
  .route('/')
  .get(createFilterObj, getAllJobs)
  .post(isAuth, allowedTo('HR'), createJobValidator, createJob);

router
  .route('/:id')
  .put(isAuth, allowedTo('HR'), updateJobValidator, updateJob)
  .delete(isAuth, allowedTo('HR'), deleteJobValidator, deleteJob);

module.exports = router;
