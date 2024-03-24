const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  verifyPasswordResetCode,
} = require('../controllers/authController');

const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyPasswordResetCodeValidator,
} = require('../utils/validators/authValidator');

const rateLimit = require('../utils/rateLimit');

const router = express.Router();

router.post('/signup', rateLimit, signupValidator, signup);
router.post('/login', rateLimit, loginValidator, login);
router.post('/forgotPassword', rateLimit, forgotPasswordValidator, forgotPassword);
router.post('/verifyResetCode', rateLimit, verifyPasswordResetCodeValidator, verifyPasswordResetCode);

module.exports = router;
