const express = require('express');

const {
  getUser,
  getUserProfile,
  updateUser,
  deleteUser,
  changePassword,
} = require('../controllers/userController');

const {
  getUserProfileValidator,
  updateUserValidator,
  changePasswordValidator,
} = require('../utils/validators/userValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(isAuth, getUser)
  .patch(isAuth, updateUserValidator, updateUser)
  .delete(isAuth, deleteUser);

router
  .route('/:id')
  .get(getUserProfileValidator, getUserProfile);

router.put('/changePassword', isAuth, changePasswordValidator, changePassword);

module.exports = router;
