const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller.js');
const { protect } = require('../middlewares/auth.js');


// Applying 'protect' middleware to all group routes


// Create a new group
router.post('/',protect, groupController.createGroup);

// Retrieve all groups
router.get('/',protect, groupController.getAllGroups);

// Retrieve a single group by id
router.get('/:id',protect, groupController.getGroupById);

// Update a group by id
router.put('/:id',protect, groupController.updateGroupById);

// Delete a group by id
router.delete('/:id',protect, groupController.deleteGroupById);

module.exports = router;
