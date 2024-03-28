const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');
const Company = require('../models/companyModel');
const Job = require('../models/jobModel');

exports.createFilterObj = asyncHandler(async (req, res, next) => {
  let filterObj = {};
  if (req.query.company) {
    const company = await Company.findOne({ companyName: { $regex: req.query.company, $options: 'i' } });
    if (company) {
      filterObj = { addedBy: company.companyHR };
    } else {
      filterObj = { addedBy: undefined };
    }
  }
  req.filterObj = filterObj;
  next();
});

exports.createJob = asyncHandler(async (req, res, next) => {
  req.body.addedBy = req.user._id;
  const company = await Company.findOne({ companyHR: req.user._id });
  if (!company) {
    return next(new ApiError('You have to create a company first', 400));
  }
  const job = await Job.create(req.body);

  res.status(201).json({ job });
});

exports.updateJob = asyncHandler(async (req, res) => {
  req.body.addedBy = req.user._id;
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ job });
});

exports.deleteJob = asyncHandler(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);

  res.status(204).json();
});

exports.getAllJobs = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Job.find(req.filterObj).populate('company'), req.query)
    .paginate()
    .filter()
    .search()
    .sort();

  const jobs = await apiFeatures.mongooseQuery;
  res.status(200).json({ results: jobs.length, jobs });
});
