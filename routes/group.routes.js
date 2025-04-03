const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller.js');
const { protect } = require('../middlewares/auth.js');

// Applying 'protect' middleware to all group routes
router.use(protect)

// Create a new group
router.post('/', groupController.createGroup);

// Retrieve all groups
router.get('/', groupController.getAllGroups);

// Retrieve a single group by id
router.get('/:id', groupController.getGroupById);

// Update a group by id
router.put('/:id', groupController.updateGroupById);

// Delete a group by id
router.delete('/:id', groupController.deleteGroupById);

module.exports = router;
