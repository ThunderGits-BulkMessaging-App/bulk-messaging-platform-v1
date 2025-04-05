// routes/credential.routes.js
const express = require('express');
const credentialController = require('../controllers/credential.controller');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/credentials', protect, credentialController.createCredential);
router.get('/credentials', protect, credentialController.getAllCredentials);
router.get('/credentials/:id', protect, credentialController.getCredentialById);
router.get('/credentials/type/:type', protect, credentialController.getCredentialsByType);
router.put('/credentials/:id', protect, credentialController.updateCredentialById);
router.delete('/credentials/:id', protect, credentialController.deleteCredentialById);

module.exports = router;
