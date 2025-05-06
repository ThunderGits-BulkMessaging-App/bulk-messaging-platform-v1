// 📁 controllers/emailCampaign.controller.js
const service = require('../services/emailCampaign.service');
const { sendMails } = require('../controllers/mail.controller.js');

exports.create = async (req, res, next) => {
  try {

    const campaign = await service.createEmailCampaign(req.user.id, req.body);
    // Automatically send emails after creation
    const result = await sendMails({
      campaignId: campaign._id,
      userId,
      selectedEmail: req.body.selectedEmail
    });
    res.status(201).json({
      success: true,
      message: 'Email campaign created and emails sent',
      campaign,
      sentStats: {
        successCount: result.successCount,
        failCount: result.failCount
      },
      details: result.results
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const campaigns = await service.getUserEmailCampaigns(req.user.id, status, parseInt(page), parseInt(limit));
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const campaign = await service.getEmailCampaignById(req.user.id, req.params.id);
    res.json(campaign);
  } catch (err) {
    next(err);
  }
};

exports.getByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const campaigns = await service.getEmailCampaignsByStatus(req.user.id, status);
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await service.updateEmailCampaign(req.user.id, req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await service.deleteEmailCampaign(req.user.id, req.params.id);
    res.json({ message: 'Email campaign deleted', id: deleted._id });
  } catch (err) {
    next(err);
  }
};
