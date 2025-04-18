const express = require('express');
const { getOfferPlans } = require('../controllers/offerPlanController');
const router = express.Router();

// Route to get all customers
router.get('/',async(req,res,next)=>{console.log("offer plan route"); next()}, getOfferPlans);


module.exports = router;
