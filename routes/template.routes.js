// 📁 routes/template.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/template.controller');
const { protect } = require('../middlewares/auth');

router.post('/', protect,controller.create);
router.get('/', protect,controller.getAll);
router.get('/:id', protect,controller.getById);
router.put('/:id', protect,controller.update);
router.delete('/:id', protect,controller.remove);
router.post('/:id/render', protect,controller.renderPreview);

module.exports = router;