const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apiKey: { type: String, required: true },
    senderIds: [{
        name: { type: String, required: true },
        value: { type: String, required: true }
    }],
    messageTemplates: [{
        name: { type: String, required: true },
        value: { type: String, required: true }
    }]
});

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;
