const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
    unique: true // Ensuring uniqueness of the group name
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

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
