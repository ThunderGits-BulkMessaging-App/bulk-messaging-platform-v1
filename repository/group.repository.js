const Group = require('../Models/Group');
const Contact = require('../Models/Contact'); // Adjust path as needed


exports.create = (groupData) => {
    const group = new Group(groupData);
    return group.save();
};

exports.findAll = (userId) => {
    console.log("I've been called");

    return Group.find()

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
    return Group.find({ createdBy: userId }).populate({
        path: 'members',
        select: 'firstName lastName phoneNumber email address' // Add fields you want
    });
};
