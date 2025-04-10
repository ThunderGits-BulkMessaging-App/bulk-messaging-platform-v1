const express = require("express");
const { getAnalytics } = require("../controllers/dashboardController");
const router = express.Router();


// @route   GET /api/analytics
// @desc    Get static analytics for SMS and Email
// @access  Public or Protected (add auth middleware if needed)
router.get("/", getAnalytics);

module.exports = router;
