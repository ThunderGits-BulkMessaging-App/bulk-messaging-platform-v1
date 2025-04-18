const express = require('express');
const {  createOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

// Route to get all customers
router.post('/orders',protect, createOrder);
router.post('/success',protect, verifyPayment);


module.exports = router;
