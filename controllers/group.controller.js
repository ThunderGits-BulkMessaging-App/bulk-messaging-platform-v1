const groupService = require('../services/group.service.js');

exports.createGroup = async (req, res) => {
    try {
        const groupData = { ...req.body, createdBy: req.user._id, organisation: req.user.organisation }; // Include createdBy and organisation
        const group = await groupService.createGroup(groupData);
        res.status(201).send(group);
    } catch (error) {
        console.log(error)
        if (error.code === 11000) { // MongoDB duplicate key error code
            res.status(409).send({ message: 'A group with the same name already exists.' });
        } else {
            res.status(500).send(error.message);
        }
    }
};

exports.getAllGroups = async (req, res) => {
    console.log("Fetching all groups");
    try {
        const groups = await groupService.getAllGroups(req.user.organisation);
        res.status(200).send(groups);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (!group) {
            return res.status(404).send('Group not found');
        }
        res.status(200).send(group);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateGroupById = async (req, res) => {
    try {
        const group = await groupService.updateGroupById(req.params.id, req.body);
        if (!group) {
            return res.status(404).send('Group not found');
        }
        res.status(200).send(group);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteGroupById = async (req, res) => {
    try {
        const group = await groupService.deleteGroupById(req.params.id);
        if (!group) {
            return res.status(404).send('Group not found');
        }
        res.status(200).send({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
