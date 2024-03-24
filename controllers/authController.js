const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const createToken = require('../utils/createToken');
const User = require('../models/userModel');

exports.signup = asyncHandler(async (req, res) => {
  req.body.username = req.body.firstName + req.body.lastName;
  req.body.status = 'online';
  const user = await User.create(req.body);

  const token = createToken(user._id);

  res.status(201).json({
    user: user,
    token: token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.username }, { mobileNumber: req.body.username }]
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new ApiError('Invalid credentials.', 401));

  const token = createToken(user._id);

  user.status = "online";
  await user.save();

  delete user._doc.password;
  res.status(200).json({
    user: user, token: token
  });
});
