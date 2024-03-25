const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    enum: ['Onsite', 'Remotely', 'Hybrid'],
    required: true,
  },
  workingTime: {
    type: String,
    enum: ['Part-Time', 'Full-Time'],
    required: true,
  },
  seniorityLevel: {
    type: String,
    enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  technicalSkills: [{
    type: String,
    required: true,
  }],
  softSkills: [{
    type: String,
    required: true,
  }],
  addedBy: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

jobSchema.virtual('company', {
  ref: 'Company',
  localField: 'addedBy',
  foreignField: 'companyHR'
});

module.exports = mongoose.model('Job', jobSchema);
