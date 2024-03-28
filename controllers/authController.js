const crypto = require('crypto');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const createToken = require('../utils/createToken');
const sendEmail = require('../utils/sendEmail');
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

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError('User not found.', 404));
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.firstName},\n\nWe received a request to reset the password on your Career Craft account.\n\n${resetCode}\n\nEnter this code to complete the reset.\n\nThanks for helping us keep your account secure.\nThe Career Craft Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)',
      message: message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError('There is an error in sending email.'));
  }

  res
    .status(200)
    .json({ message: 'Reset code sent to email.' });
});

exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ApiError('Invalid or expired password reset code.', 400));
  }

  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: "Success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError('User not found.', 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code is not verified.', 400));
  }

  user.password = req.body.password;
  user.passwordChangedAt = Date.now();
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  const token = createToken(user._id);
  res.status(200).json({ token });
});
