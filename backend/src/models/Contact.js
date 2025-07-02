const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  organization: {
    type: String,
    trim: true,
    maxlength: 200
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  reason: {
    type: String,
    enum: ['OF', 'CO', 'PR', 'OT'],
    required: true
  },
  otherReason: {
    type: String,
    trim: true,
    maxlength: 500
  },
  meetingDate: {
    type: Date
  },
  meetingTime: {
    type: String,
    enum: ['AM', 'PM']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);