const express = require('express');
const multer = require('multer');
const contactController = require('../controllers/contact.controller.js');
const router = express.Router();
const { protect } = require('../middlewares/auth.js');
const upload = multer({ dest: 'uploads/' });

router.post('/contacts', protect, contactController.createContact);
router.get('/contacts', protect, contactController.getContacts);
router.put('/contacts/:id', protect, contactController.updateContact);
router.delete('/contacts/:id', protect, contactController.deleteContact);
router.post('/contacts/upload', protect, upload.single('file'), contactController.bulkUploadContacts);

module.exports = router;
