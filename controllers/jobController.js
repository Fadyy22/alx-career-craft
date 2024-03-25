const asyncHandler = require('express-async-handler');

const Job = require('../models/jobModel');

exports.createJob = asyncHandler(async (req, res) => {
  req.body.addedBy = req.user._id;
  const job = await Job.create(req.body);

  res.status(201).json({ job });
});
