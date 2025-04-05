// routes/smsCredentials.routes.js
const express = require('express');
const router = express.Router();
const smsCredentialsController = require('../controllers/smsCredentials.controller');
const { protect } = require('../middlewares/auth');

router.post('/sms-credentials', protect, smsCredentialsController.createSMSCredential);
router.get('/sms-credentials', protect, smsCredentialsController.getAllSMSCredentials);
router.get('/sms-credentials/:id', protect, smsCredentialsController.getSMSCredentialById);
router.put('/sms-credentials/:id', protect, smsCredentialsController.updateSMSCredentialById);
router.delete('/sms-credentials/:id', protect, smsCredentialsController.deleteSMSCredentialById);

module.exports = router;
