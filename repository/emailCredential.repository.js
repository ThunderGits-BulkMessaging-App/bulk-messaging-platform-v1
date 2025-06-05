const EmailCredential = require('../Models/EmailCredential.js');

exports.create = (data) => EmailCredential.create(data);

exports.findByOrganisationId = (organisationId) => EmailCredential.find({ organisation: organisationId });

exports.findById = (id) => EmailCredential.findById(id);

exports.update = (id, data) => EmailCredential.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => EmailCredential.findByIdAndDelete(id);

exports.findByUserIdAndEmail = (organisationId, email) => EmailCredential.findOne({ organisation: organisationId, email });

