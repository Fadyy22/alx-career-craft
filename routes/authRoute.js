const express = require('express');

const {
  signup,
  login,
} = require('../controllers/authController');

const {
  signupValidator,
  loginValidator,
} = require('../utils/validators/authValidator');

const rateLimit = require('../utils/rateLimit');

const router = express.Router();

router.post('/signup', rateLimit, signupValidator, signup);
router.post('/login', rateLimit, loginValidator, login);

module.exports = router;
