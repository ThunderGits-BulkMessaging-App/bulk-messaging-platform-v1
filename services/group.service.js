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

exports.getAllGroupsByUser = (userId) => {
    return groupRepository.findAllByUserId(userId);
};
