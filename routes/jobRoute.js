const express = require('express');

const {
  createJob,
} = require('../controllers/jobController');

const {
  createJobValidator,
} = require('../utils/validators/jobValidator');


const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, allowedTo('HR'), createJobValidator, createJob);

module.exports = router;
