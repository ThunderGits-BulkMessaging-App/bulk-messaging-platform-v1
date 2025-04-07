const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailCredential.controller.js');
const { protect } = require('../middlewares/auth');

router.use(protect);

router.post('/email-credentials', controller.createCredential);
router.get('/email-credentials', controller.getCredentials);
router.put('/email-credentials/:id', controller.updateCredential);
router.delete('/email-credentials/:id', controller.deleteCredential);

module.exports = router;
