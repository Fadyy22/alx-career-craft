const asyncHandler = require('express-async-handler');
const excelJS = require('exceljs');
const multer = require('multer');

const cloudinary = require('../utils/cloudinary');
const ApiError = require('../utils/apiError');
const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

const multerFilter = function (req, file, cb) {
  if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword') {
    return cb(new ApiError('Please upload a valid file', 400), false);
  }
  cb(null, true);
};

const upload = multer({ fileFilter: multerFilter });

exports.parseResume = upload.single('resume');

exports.uploadResume = (req, res, next) => {
  if (req.file) {
    cloudinary.uploader.upload_stream((err, result) => {
      if (err) {
        throw new ApiError('Error uploading file', 500);
      }
      req.body.userResume = result.url;
      next();
    }).end(req.file.buffer);
  } else {
    throw new ApiError('Please upload a file', 400);
  }
};

exports.applyJob = asyncHandler(async (req, res) => {
  req.body.jobId = req.params.id;
  req.body.userId = req.user._id;

  const application = await Application.create(req.body);
  res.status(201).json({ application });
});

exports.getAllApplications = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job.addedBy.toString() !== req.user._id.toString()) {
    return next(new ApiError('Unauthorized', 403));
  }
  const applications = await Application.find({ jobId: job._id }).populate({
    path: 'userId',
    select: 'firstName lastName DOB email mobileNumber',
  });
  res.status(200).json({ applications });
});

exports.downloadExcel = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (job.addedBy.toString() !== req.user._id.toString()) {
    return next(new ApiError('Unauthorized', 403));
  }

  const workBook = new excelJS.Workbook();
  const sheet = workBook.addWorksheet('Applications');
  sheet.columns = [
    { header: 'Application ID', key: '_id' },
    { header: 'Job ID', key: 'jobId' },
    { header: 'User ID', key: 'userId._id' },
    { header: 'First Name', key: 'userId.firstName' },
    { header: 'Last Name', key: 'userId.lastName' },
    { header: 'Email', key: 'userId.email' },
    { header: 'DOB', key: 'userId.DOB' },
    { header: 'Mobile Number', key: 'userId.mobileNumber' },
    { header: 'Tech Skills', key: 'userTechSkills' },
    { header: 'Soft Skills', key: 'userSoftSkills' },
    { header: 'Resume Link', key: 'userResume' },
  ];
  const applications = await Application.find({ jobId: job._id }).populate('userId');
  applications.forEach(application => {
    const rowData = {
      _id: application._id.toString(),
      jobId: application.jobId.toString(),
      'userId._id': application.userId._id.toString(),
      'userId.firstName': application.userId.firstName,
      'userId.lastName': application.userId.lastName,
      'userId.email': application.userId.email,
      'userId.DOB': application.userId.DOB.toISOString().split('T')[0],
      'userId.mobileNumber': application.userId.mobileNumber,
      userTechSkills: application.userTechSkills.join(', '),
      userSoftSkills: application.userSoftSkills.join(', '),
      userResume: application.userResume,
    };
    sheet.addRow(rowData);
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${job.jobTitle}-${job._id}-applications.xlsx"`);
  workBook.xlsx.write(res);
});
