// 📁 repositories/template.repository.js
const Template = require('../Models/Template');

exports.create = (data) => Template.create(data);
exports.findByOrganisationId = (organisationId) => Template.find({ organisation: organisationId });
exports.findById = (id) => Template.findById(id);
exports.update = (id, data) => Template.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => Template.findByIdAndDelete(id);
