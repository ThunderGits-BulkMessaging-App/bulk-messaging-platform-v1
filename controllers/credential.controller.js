// controllers/credential.controller.js
const credentialService = require('../services/credential.service');

exports.createCredential = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming _id is set by the auth middleware
        const credentialData = { ...req.body, userId };
        const credential = await credentialService.createCredential(credentialData);
        res.status(201).json(credential);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCredentials = async (req, res) => {
    try {
        const credentials = await credentialService.getAllCredentials();
        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCredentialById = async (req, res) => {
    try {
        const credential = await credentialService.getCredentialById(req.params.id);
        if (credential) {
            res.json(credential);
        } else {
            res.status(404).json({ message: 'Credential not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCredentialsByType = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming _id is set by the auth middleware
        const type = req.params.type;
        const credentials = await credentialService.getCredentialsByType(userId, type);
        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCredentialById = async (req, res) => {
    try {
        const updatedCredential = await credentialService.updateCredentialById(req.params.id, req.body);
        res.json(updatedCredential);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCredentialById = async (req, res) => {
    try {
        await credentialService.deleteCredentialById(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
