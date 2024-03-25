const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numberOfEmployees: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyHR: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

companySchema.virtual('jobs', {
  ref: 'Job',
  localField: 'companyHR',
  foreignField: 'addedBy',
});

module.exports = mongoose.model('Company', companySchema);
