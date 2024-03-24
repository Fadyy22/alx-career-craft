const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ user: user });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select('firstName lastName bio email mobileNumber DOB role status');

  if (!user) {
    return next(new ApiError('User not found.', 404));
  }

  res.status(200).json({ user: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    email: req.body.email,
    recoveryEmail: req.body.recoveryEmail,
    DOB: req.body.DOB,
    mobileNumber: req.body.mobileNumber,
  };

  const user = await User.findById(req.user._id);

  if (req.body.firstName) {
    userData.username = req.body.firstName + user.lastName;
  }

  if (req.body.lastName) {
    userData.username = user.firstName + req.body.lastName;
  }

  if (req.body.firstName && req.body.lastName) {
    userData.username = req.body.firstName + req.body.lastName;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, userData, { new: true });
  res.status(200).json({ user: updatedUser });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  res.status(204).send();
});
