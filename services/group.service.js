const groupRepository = require('../repository/group.repository.js');

exports.createGroup = (groupData) => {
    return groupRepository.create(groupData);
};

exports.getAllGroups = () => {
    console.log("I've been called service");
    return groupRepository.findAll();
};


exports.getGroupById = (id) => {
    return groupRepository.findById(id);
};

exports.updateGroupById = (id, updateData) => {
    return groupRepository.updateById(id, updateData);
};

exports.deleteGroupById = (id) => {
    return groupRepository.deleteById(id);
};

// services/groupService.js

exports.getAllGroupsByUser = async (userId) => {
    const groups = await groupRepository.findAllByUserId(userId);

    // Add memberCount to each group
    const updatedGroups = groups.map(group => {
        const groupObj = group.toObject(); // Convert Mongoose document to plain object
        groupObj.memberCount = group.members.length;
        return groupObj;
    });

    return updatedGroups;
};

