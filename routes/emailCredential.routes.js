const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailCredential.controller.js');
const { protect } = require('../middlewares/auth.js');

router.post('/email-credentials', protect, controller.createCredential);
router.get('/email-credentials', protect, controller.getCredentials);
router.put('/email-credentials/:id', protect, controller.updateCredential);
router.delete('/email-credentials/:id', protect, controller.deleteCredential);

module.exports = router;
