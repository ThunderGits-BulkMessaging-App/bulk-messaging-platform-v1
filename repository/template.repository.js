// 📁 repositories/template.repository.js
const Template = require('../Models/Template');

exports.create = (data) => Template.create(data);
exports.findByUserId = (userId) => Template.find({ userId });
exports.findById = (id) => Template.findById(id);
exports.update = (id, data) => Template.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => Template.findByIdAndDelete(id);
