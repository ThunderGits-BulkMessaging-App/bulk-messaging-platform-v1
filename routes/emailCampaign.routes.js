// 📁 routes/emailCampaign.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailCampaign.controller');
const { protect } = require('../middlewares/auth');

router.use(protect);
router.post('/email-campaign', controller.create);
router.get('/email-campaign', controller.getAll);
router.get('/email-campaign/:id', controller.getById);
router.get('/email-campaign/status/:status', controller.getByStatus);
router.put('/email-campaign/:id', controller.update);
router.delete('/email-campaign/:id', controller.remove);

module.exports = router;