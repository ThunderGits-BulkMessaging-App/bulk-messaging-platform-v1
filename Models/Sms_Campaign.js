const mongoose = require("mongoose");

const smsCampaignSchema = new mongoose.Schema({
  organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
    name: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    messageTemplateId: {
        type: String,
        required: true
    },
    messageText: {
        type: String,
        required: true
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    status: {
        type: String,
        enum: ['Draft', 'Scheduled', 'Sent', 'Failed', 'Cancelled'],
        default: 'Draft'
    },
    scheduledAt: {
        type: Date,
        default: null
    },
    sentAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    },
    failureReason: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const SMSCampaign = mongoose.model("SMSCampaign", smsCampaignSchema);

module.exports = SMSCampaign;
