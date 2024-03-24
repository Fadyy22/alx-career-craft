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
