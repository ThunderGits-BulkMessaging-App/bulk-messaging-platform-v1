// 📁 repositories/emailCampaign.repository.js
const EmailCampaign = require('../Models/EmailCampaign.js');

exports.create = (data) => EmailCampaign.create(data);
exports.findByUserId = (userId) => EmailCampaign.find({ userId }).populate('groupIds templateId').sort({createdAt:-1});

exports.findById = (id) => EmailCampaign.findById(id).populate('groupIds templateId');
exports.update = (id, data) => EmailCampaign.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => EmailCampaign.findByIdAndDelete(id);
exports.findByStatus = (userId, status) =>
    EmailCampaign.find({ userId, status }).populate('groupIds templateId');
