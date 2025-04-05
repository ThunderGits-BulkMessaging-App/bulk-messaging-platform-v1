// controllers/smsCredentials.controller.js
const smsCredentialsService = require('../services/smsCredentials.service');

exports.createSMSCredential = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting userId from request object
        const credentialData = { ...req.body, userId };
        const credential = await smsCredentialsService.createSMSCredential(credentialData);
        res.status(201).json(credential);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSMSCredentials = async (req, res) => {
    try {
        const userId = req.user.id; // Extracting userId from request object
        const credentials = await smsCredentialsService.getAllSMSCredentials(userId);
        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSMSCredentialById = async (req, res) => {
    try {
        const credential = await smsCredentialsService.getSMSCredentialById(req.params.id);
        if (!credential) {
            return res.status(404).json({ message: 'Credential not found' });
        }
        res.json(credential);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSMSCredentialById = async (req, res) => {
    try {
        const updatedCredential = await smsCredentialsService.updateSMSCredentialById(req.params.id, req.body);
        res.json(updatedCredential);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSMSCredentialById = async (req, res) => {
    try {
        await smsCredentialsService.deleteSMSCredentialById(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
