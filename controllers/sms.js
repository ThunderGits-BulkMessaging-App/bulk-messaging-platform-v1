// controllers/credentialsController.js

const Credential = require('../Models/Credential.js');

exports.addOrUpdateCredential = async (req, res) => {
    const { userId, apiKey, senderIds, messageTemplates } = req.body;
    try {
        const credential = await Credential.findOneAndUpdate(
            { userId },
            { apiKey, senderIds, messageTemplates },
            { new: true, upsert: true }
        );
        res.status(201).json(credential);
    } catch (error) {
        res.status(400).json({ message: "Failed to save credentials", error: error.message });
    }
};

exports.getCredentials = async (req, res) => {
    const { userId } = req.params;
    try {
        const credentials = await Credential.findOne({ userId });
        if (credentials) {
            res.status(200).json(credentials);
        } else {
            res.status(404).json({ message: "No credentials found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving credentials", error: error.message });
    }
};
