const mongoose = require("mongoose");

const smsCredentialsSchema = new mongoose.Schema({
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',
        required: true,
        unique: true // Ensuring each user has only one set of SMS credentials
    },
  
    apiKey: {
        type: String,
        required: true
    },
    senderIds: [{
        type: String,
        required: true
    }],
    messageTemplates: [{
        name: { type: String, required: true },
        templateId: { type: String, required: true },
        message: { type: String, required: true } // This will store the actual message text
    }]
}, { timestamps: true });

const SMSCredentials = mongoose.model("SMSCredentials", smsCredentialsSchema);

module.exports = SMSCredentials;
