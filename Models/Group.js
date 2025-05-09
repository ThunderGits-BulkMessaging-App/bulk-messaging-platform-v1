const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Contact = require('./Contact.js'); // Assuming Contact model is in the same directory

const groupSchema = new Schema({
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

// Compound index: unique name per user
groupSchema.index({ groupName: 1, createdBy: 1 }, { unique: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
