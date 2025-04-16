// services/smsCampaign.service.js
const smsCampaignRepository = require('../repository/smsCampaign.respository');
const axios = require('axios');
const SMSCampaign = require('../Models/Sms_Campaign');
const Group = require('../Models/Group');
const Contact = require('../Models/Contact');
const SMSCredentials = require('../Models/Sms_Credentials');
const smsCredentialsRepository = require('../repository/smsCredentials.repository');

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
        const campaign = await SMSCampaign.findById(campaignId).populate('groups');
        if (!campaign) throw new Error('Campaign not found');

        const { userId, senderId, messageTemplateId, groups } = campaign;

        // Step 1: Get SMS Credentials
        const credentials = await SMSCredentials.findOne({ userId });
        if (!credentials) throw new Error('SMS credentials not found for user');

        const apiKey = credentials.apiKey;

        // Step 2: Get the actual message text using template ID
        // const template = credentials.messageTemplates.find(t => t.templateId === messageTemplateId);
        // if (!template) throw new Error('Message template not found in credentials');

        // const messageText = template.message;

        // Step 3: Fetch contacts from groups
        const groupIds = groups.map(group => group._id);
        const contacts = await Contact.find({ groups: { $in: groupIds } });

        if (!contacts.length) throw new Error('No contacts found in the selected groups');

        // Step 4: Generate request array
        const requests = contacts
            .filter(contact => contact.phoneNumber)
            .map(contact => {
                const variables = `${contact.firstName}`; // You can enhance this to match more vars
                return {
                    sender_id: senderId,
                    message: messageTemplateId,
                    variables_values: variables,
                    flash: 0,
                    numbers: contact.phoneNumber
                };
            });

        const payload = {
            route: "dlt",
            requests
        };

        // Step 5: Send SMS via Fast2SMS
        const response = await axios.post('https://www.fast2sms.com/dev/custom', payload, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const statusUpdate = response.data.return
            ? { status: 'Sent', sentAt: new Date() }
            : { status: 'Failed', failureReason: 'API Error' };

        await smsCampaignRepository.updateCampaignById(campaignId, statusUpdate);
        return response.data;

    } catch (error) {
        await smsCampaignRepository.updateCampaignById(campaignId, {
            status: 'Failed',
            failureReason: error.message
        });
        throw error;
    }
};