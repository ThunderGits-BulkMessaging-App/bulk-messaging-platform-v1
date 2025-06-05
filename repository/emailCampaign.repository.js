// 📁 repositories/emailCampaign.repository.js
const EmailCampaign = require('../Models/EmailCampaign.js');

exports.create = (data) => EmailCampaign.create(data);
exports.findByOrganisationId = (organisationId) => EmailCampaign.find({ organisation: organisationId }).populate('groupIds templateId').sort({ createdAt: -1 });

exports.findById = (id) => EmailCampaign.findById(id).populate('groupIds templateId');
exports.update = (id, data) => EmailCampaign.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => EmailCampaign.findByIdAndDelete(id);
exports.findByStatus = (organisationId, status) =>
    EmailCampaign.find({ organisation: organisationId, status }).populate('groupIds templateId');
