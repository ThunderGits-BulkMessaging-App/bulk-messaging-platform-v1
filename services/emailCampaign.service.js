
// 📁 services/emailCampaign.service.js
const repo = require('../repository/emailCampaign.repository');

exports.createEmailCampaign = (organisationId, data) => {
  return repo.create({ ...data, organisation: organisationId });
};

exports.getUserEmailCampaigns = (organisationId, status, page = 1, limit = 10) => {
  return repo.findByOrganisationId(organisationId, status, page, limit);
};

exports.getEmailCampaignById = async (organisationId, id) => {
  const campaign = await repo.findById(id);
  if (!campaign || campaign.organisation.toString() !== organisationId) {
    const err = new Error('Email campaign not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return campaign;
};

exports.getEmailCampaignsByStatus = (organisationId, status) => {
  return repo.findByStatus(organisationId, status);
};

exports.updateEmailCampaign = async (organisationId, id, data) => {
  const campaign = await repo.findById(id);
  if (!campaign || campaign.organisation.toString() !== organisationId) {
    const err = new Error('Email campaign not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return repo.update(id, data);
};

exports.deleteEmailCampaign = async (organisationId, id) => {
  const campaign = await repo.findById(id);
  if (!campaign || campaign.organisation.toString() !== organisationId) {
    const err = new Error('Email campaign not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return repo.remove(id);
};
