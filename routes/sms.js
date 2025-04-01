// routes/credentialsRoutes.js

const express = require('express');
const router = express.Router();
const credentialsController = require('../controllers/sms.js');

router.post('/credentials', credentialsController.addOrUpdateCredential);
router.get('/credentials/:userId', credentialsController.getCredentials);

module.exports = router;
