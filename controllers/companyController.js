const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const Company = require('../models/companyModel');

exports.createFilterObj = asyncHandler(async (req, res, next) => {
  let filterObj = {};
  if (req.query.name) {
    filterObj = { companyName: { $regex: req.query.name, $options: 'i' } };
  }
  req.filterObj = filterObj;
  next();
});

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

exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id).populate('jobs');
  if (!company) {
    return next(new ApiError('Company not found.', 404));
  }

  res.status(200).json({ company });
});

exports.getCompanies = asyncHandler(async (req, res, next) => {
  const companies = await Company.find(req.filterObj);

  res.status(200).json({ companies });
});
