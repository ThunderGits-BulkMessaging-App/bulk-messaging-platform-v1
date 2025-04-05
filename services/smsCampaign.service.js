// services/smsCampaign.service.js
const smsCampaignRepository = require('../repository/smsCampaign.respository');
const axios = require('axios');

exports.createCampaign = (userId, campaignData) => {
    return smsCampaignRepository.createCampaign({ ...campaignData, userId });
};

exports.getCampaignById = (id) => {
    return smsCampaignRepository.findCampaignById(id);
};

exports.getAllCampaignsByUser = (userId) => {
    return smsCampaignRepository.findAllCampaignsByUser(userId);
};

exports.updateCampaign = (id, campaignData) => {
    return smsCampaignRepository.updateCampaignById(id, campaignData);
};

exports.deleteCampaign = (id) => {
    return smsCampaignRepository.deleteCampaignById(id);
};

exports.sendSMS = async (campaignId) => {
    try {
        const campaign = await this.getCampaignById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }

        // Assuming campaign data includes all necessary details like senderId, messageTemplateId
        const { senderId, messageTemplateId, numbers } = campaign;

        const data = {
            route: "dlt",
            requests: [{
                sender_id: senderId,
                message: messageTemplateId,
                variables_values: "1234567890|1234|5678|", // Example variable values
                flash: 0,
                numbers: numbers.join(',')
            }]
        };

        const response = await axios.post('https://www.fast2sms.com/dev/custom', data, {
            headers: {
                'Authorization': 'YOUR_API_KEY',
                'Content-Type': 'application/json'
            }
        });

        // Updating campaign status based on response
        const statusUpdate = response.data.return ? { status: 'Sent', sentAt: new Date() } : { status: 'Failed', failureReason: 'API Error' };
        await smsCampaignRepository.updateCampaignById(campaignId, statusUpdate);

        return response.data;
    } catch (error) {
        await smsCampaignRepository.updateCampaignById(campaignId, { status: 'Failed', failureReason: error.message });
        throw error;
    }
};
