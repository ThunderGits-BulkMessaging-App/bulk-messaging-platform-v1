
// 📁 services/emailCampaign.service.js
const repo = require('../repository/emailCampaign.repository');

exports.createEmailCampaign = (userId, data) => {   
  return repo.create({ ...data, userId });
};

exports.getUserEmailCampaigns = (userId, status, page = 1, limit = 10) => {
  return repo.findByUserId(userId, status, page, limit);
};

exports.getEmailCampaignById = async (userId, id) => {
  const campaign = await repo.findById(id);
  if (!campaign || campaign.userId.toString() !== userId) {
    const err = new Error('Email campaign not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return campaign;
};

exports.getEmailCampaignsByStatus = (userId, status) => {
  return repo.findByStatus(userId, status);
};

exports.updateEmailCampaign = async (userId, id, data) => {
  const campaign = await repo.findById(id);
  if (!campaign || campaign.userId.toString() !== userId) {
    const err = new Error('Email campaign not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return repo.update(id, data);
};

exports.deleteEmailCampaign = async (userId, id) => {
  const campaign = await repo.findById(id);
  if (!campaign || campaign.userId.toString() !== userId) {
    const err = new Error('Email campaign not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return repo.remove(id);
};
