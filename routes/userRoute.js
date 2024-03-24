const express = require('express');

const {
  getUser,
  getUserProfile,
} = require('../controllers/userController');

const {
  getUserProfileValidator,
} = require('../utils/validators/userValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(isAuth, getUser);

router
  .route('/:id')
  .get(getUserProfileValidator, getUserProfile);

module.exports = router;
