// 📁 models/EmailCampaign.js
const mongoose = require('mongoose');

const emailCampaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  status: { type: String, enum: ['draft', 'sent', 'scheduled'], default: 'draft' },
  scheduledAt: Date
}, { timestamps: true });

module.exports = mongoose.model('EmailCampaign', emailCampaignSchema);