const asyncHandler = require('express-async-handler');

const Company = require('../models/companyModel');

exports.createCompany = asyncHandler(async (req, res) => {
  req.body.companyHR = req.user._id;

  const company = await Company.create(req.body);

  res.status(201).json({ company: company });
});
