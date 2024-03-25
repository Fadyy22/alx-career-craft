const express = require('express');

const {
  parseResume,
  uploadResume,
  applyJob,
} = require('../controllers/applicationController');

const {
  createApplicationValidator,
} = require('../utils/validators/applicationValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router({ mergeParams: true });

router.
  post('/', isAuth, allowedTo('USER'), parseResume, createApplicationValidator, uploadResume, applyJob);

module.exports = router;
