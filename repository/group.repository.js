const Group = require('../Models/Group');

exports.create = (groupData) => {
    const group = new Group(groupData);
    return group.save();
};

exports.findAll = () => {
    return Group.find();
};

exports.findById = (id) => {
    return Group.findById(id);
};

exports.updateById = (id, updateData) => {
    return Group.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = (id) => {
    return Group.findByIdAndDelete(id);
};

// repositories/groupRepository.js

exports.findAllByUserId = (userId) => {
    return Group.find({ createdBy: userId });
};
