const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const Company = require('../models/companyModel');

exports.createCompany = asyncHandler(async (req, res) => {
  req.body.companyHR = req.user._id;

  const company = await Company.create(req.body);

  res.status(201).json({ company: company });
});

exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findOne({ companyHR: req.user._id });
  if (!company) {
    return next(new ApiError('Company not found.', 404));
  }
  req.body.numberOfEmployees.min = req.body.numberOfEmployees.min || company.numberOfEmployees.min;
  req.body.numberOfEmployees.max = req.body.numberOfEmployees.max || company.numberOfEmployees.max;

  const updatedCompany = await Company.findByIdAndUpdate(company._id, req.body, { new: true });

  res.status(200).json({ company: updatedCompany });
});

exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findOneAndDelete({ companyHR: req.user._id });
  if (!company) {
    return next(new ApiError('Company not found.', 404));
  }

  res.status(204).json();
});
