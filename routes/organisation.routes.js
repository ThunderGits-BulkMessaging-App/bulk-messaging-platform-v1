const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { createOrganisation,getAllOrganisations,getOrganisationById,updateOrganisation,deleteOrganisation } = require('../controllers/organisation.controller');

router.post('/', protect, createOrganisation);
router.get('/', protect, getAllOrganisations);
router.get('/:id', protect, getOrganisationById);
router.put('/:id', protect, updateOrganisation);
router.delete('/:id', protect, deleteOrganisation);

module.exports = router;
