const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptioncontroller');
const checkActiveSubscription = require('../middlewares/subscriptionMiddleware');
const { protect } = require('../middlewares/auth');

// Get all subscriptions
router.get('/',protect, checkActiveSubscription,subscriptionController.getAllSubscriptions);


router.get('/curr',protect, subscriptionController.getCurrSubscriptions);

// Get subscription by hospital ID
router.get('/:hospitalId',protect,checkActiveSubscription, subscriptionController.getSubscriptionByHospital);

// Cancel subscription by ID
router.put('/cancel/:id',protect,checkActiveSubscription, subscriptionController.cancelSubscription);

module.exports = router;
