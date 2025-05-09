// repositories/smsCampaign.repository.js
const SMSCampaign = require('../Models/Sms_Campaign');

exports.createCampaign = (campaignData) => {
    return SMSCampaign.create(campaignData);
};

exports.findCampaignById = (id) => {
    return SMSCampaign.findById(id).populate('groups');
};

exports.findAllCampaignsByUser = (userId) => {
    return SMSCampaign.find({ userId });
};

exports.updateCampaignById = (id, updateData) => {
    return SMSCampaign.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCampaignById = (id) => {
    return SMSCampaign.findByIdAndDelete(id);
};
