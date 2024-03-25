const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  jobId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Job',
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  userTechSkills: [{
    type: String,
    requried: true,
  }],
  userSoftSkills: [{
    type: String,
    requried: true,
  }],
  userResume: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
