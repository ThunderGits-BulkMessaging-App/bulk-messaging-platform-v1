const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Contact = require('./Contact.js'); // Assuming Contact model is in the same directory

const groupSchema = new Schema({
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true
  },
  groupName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdated' }
});
groupSchema.index({ organisation: 1, groupName: 1 }, { unique: true });
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
