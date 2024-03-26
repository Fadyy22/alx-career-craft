const express = require('express');

const {
  parseResume,
  uploadResume,
  applyJob,
  getAllApplications,
  downloadExcel,
} = require('../controllers/applicationController');

const {
  createApplicationValidator,
  getAllApplicationsValidator,
} = require('../utils/validators/applicationValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router({ mergeParams: true });

router.
  route('/')
  .post(isAuth, allowedTo('USER'), parseResume, createApplicationValidator, uploadResume, applyJob)
  .get(isAuth, allowedTo('HR'), getAllApplicationsValidator, getAllApplications);

router
  .get('/download', isAuth, allowedTo('HR'), downloadExcel);

module.exports = router;
