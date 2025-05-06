// routes/inquiryRoutes.js
const express = require('express');
const { createInquiry, getAllInquiries, updateInquiryStatus } = require('../controllers/inquirycontroller');
const { protect } = require('../middlewares/auth');
const router = express.Router();


router.post('/', createInquiry);
router.get('/',protect, getAllInquiries);
router.put('/:id',protect, updateInquiryStatus);

module.exports = router;
