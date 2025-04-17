// repositories/smsCredentials.repository.js
const SMSCredentials = require('../Models/Sms_Credentials');

exports.create = (credentialsData) => {
    return SMSCredentials.create(credentialsData);
};

exports.findAll = (organisation) => {
    return SMSCredentials.find({ organisation });
};

exports.findById = (id) => {
    return SMSCredentials.findById(id);
};

exports.updateById = (id, updateData) => {
    return SMSCredentials.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = (id) => {
    return SMSCredentials.findByIdAndDelete(id);
};
