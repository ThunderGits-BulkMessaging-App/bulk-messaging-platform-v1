// models/Credential.js

const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['SMS', 'Email', 'WhatsApp'],
        required: true
    },
    details: {
        apiKey: { type: String },
        senderIds: [{
            name: { type: String },
            value: { type: String }
        }],
        messageTemplates: [{
            name: { type: String },
            value: { type: String }
        }],
        emailUser: { type: String },
        emailPassword: { type: String },
        whatsappApiKey: { type: String },
    }
}, { timestamps: true });

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;
