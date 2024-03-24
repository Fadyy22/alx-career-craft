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
  .put(isAuth, updateUserValidator, updateUser)
  .delete(isAuth, deleteUser);

router
  .route('/:id')
  .get(getUserProfileValidator, getUserProfile);

router.put('/changePassword', isAuth, changePasswordValidator, changePassword);

module.exports = router;
