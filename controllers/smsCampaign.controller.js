// controllers/smsCampaign.controller.js
const smsCampaignService = require('../services/smsCampaign.service');


exports.createCampaign = async (req, res) => {
    try {
        const userId = req.user.id;
        const campaignData = req.body;
        const campaign = await smsCampaignService.createCampaignInOrganisation(req.user.organisation, campaignData);
        const sentSms = smsCampaignService.sendSMS(campaign._id);
        if (sentSms) {
            console.log(`SMS sent successfully for campaign ID: ${campaign._id}`);
        } else {
            console.log(`Failed to send SMS for campaign ID: ${campaign._id}`);
        }
        res.status(201).json({ success: true, message: 'SMS sending initiated', data: result, campaign });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCampaigns = async (req, res) => {
    try {
        const userId = req.user.id;
        const campaigns = await smsCampaignService.getAllCampaigns(req.user.organisation);
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await smsCampaignService.getCampaignById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const updatedCampaign = await smsCampaignService.updateCampaign(req.params.id, req.body);
        res.json(updatedCampaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        await smsCampaignService.deleteCampaign(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendSMS = async (req, res) => {
    try {
        const result = await smsCampaignService.sendSMS(req.params.id);
        res.json({ success: true, message: 'SMS sending initiated', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

