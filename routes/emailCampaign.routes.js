// 📁 routes/emailCampaign.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailCampaign.controller');
const mailController = require('../controllers/mail.controller');
const { protect } = require('../middlewares/auth');


;
router.post('/email-campaign',protect, controller.create);
router.get('/email-campaign',protect, controller.getAll);
router.get('/email-campaign/:id',protect, controller.getById);
router.get('/email-campaign/status/:status',protect, controller.getByStatus);
router.put('/email-campaign/:id',protect, controller.update);
router.delete('/email-campaign/:id',protect, controller.remove);
router.post('/email-campaign/send',protect, mailController.sendMails);

module.exports = router;