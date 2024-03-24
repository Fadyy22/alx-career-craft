const express = require('express');

const {
  getUser,
  getUserProfile,
  updateUser,
} = require('../controllers/userController');

const {
  getUserProfileValidator,
  updateUserValidator,
} = require('../utils/validators/userValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(isAuth, getUser)
  .put(isAuth, updateUserValidator, updateUser);


router
  .route('/:id')
  .get(getUserProfileValidator, getUserProfile);

module.exports = router;
