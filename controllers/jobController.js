const asyncHandler = require('express-async-handler');

const Job = require('../models/jobModel');

exports.createJob = asyncHandler(async (req, res) => {
  req.body.addedBy = req.user._id;
  const job = await Job.create(req.body);

  res.status(201).json({ job });
});

exports.updateJob = asyncHandler(async (req, res) => {
  req.body.addedBy = req.user._id;
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ job });
});
