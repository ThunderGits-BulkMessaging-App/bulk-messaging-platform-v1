// 📁 routes/template.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/template.controller');
const { protect } = require('../middlewares/auth');

router.use(protect);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/:id/render', controller.renderPreview);

module.exports = router;