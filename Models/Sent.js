const mongoose = require("mongoose");

const sentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    messageType: {
        type: String,
        enum: ['SMS', 'WhatsApp', 'Email'],
        required: true
    },
    senderId: {
        type: String,  // For SMS and WhatsApp, this could be a sender ID
        required: false  // Make this optional as it might not be needed for emails
    },
    templateId: {
        type: String,  // Reference to a message template used, if applicable
        required: false
    },
    content: {
        type: String,  // The actual message content or a reference to the template content
        required: true
    },
    status: {
        type: String,
        enum: ['Sent', 'Failed', 'Pending'],
        default: 'Pending'
    },
    additionalInfo: {
        type: Map,
        of: String  // Store any other relevant information in a flexible key-value pair format
    }
}, { timestamps: true });

const Sent = mongoose.model("Sent", sentSchema);

module.exports = Sent;
