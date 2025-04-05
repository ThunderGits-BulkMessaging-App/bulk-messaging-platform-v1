// routes/smsCampaign.routes.js
const express = require('express');
const smsCampaignController = require('../controllers/smsCampaign.controller.js');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/sms-campaigns', protect, smsCampaignController.createCampaign);
router.get('/sms-campaigns', protect, smsCampaignController.getAllCampaigns);
router.get('/sms-campaigns/:id', protect, smsCampaignController.getCampaignById);
router.put('/sms-campaigns/:id', protect, smsCampaignController.updateCampaign);
router.delete('/sms-campaigns/:id', protect, smsCampaignController.deleteCampaign);
router.post('/sms-campaigns/send/:id', protect, smsCampaignController.sendSMS);

module.exports = router;
