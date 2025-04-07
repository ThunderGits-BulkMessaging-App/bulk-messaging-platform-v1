const EmailCredential = require('../Models/EmailCredential.js');

exports.create = (data) => EmailCredential.create(data);

exports.findByUserId = (userId) => EmailCredential.find({ userId });

exports.findById = (id) => EmailCredential.findById(id);

exports.update = (id, data) => EmailCredential.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => EmailCredential.findByIdAndDelete(id);

exports.findByUserIdAndEmail = (userId, email) => EmailCredential.findOne({ userId, email });

