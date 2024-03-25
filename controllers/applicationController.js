const asyncHandler = require('express-async-handler');
const multer = require('multer');

const cloudinary = require('../utils/cloudinary');
const ApiError = require('../utils/apiError');
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
