// services/smsCredentials.service.js
const smsCredentialsRepository = require('../repository/smsCredentials.repository');

exports.createSMSCredential = (credentialsData) => {
    return smsCredentialsRepository.create(credentialsData);
};

exports.getAllSMSCredentials = () => {
    return smsCredentialsRepository.findAll();
};

exports.getSMSCredentialById = (id) => {
    return smsCredentialsRepository.findById(id);
};

exports.updateSMSCredentialById = (id, updateData) => {
    return smsCredentialsRepository.updateById(id, updateData);
};

exports.deleteSMSCredentialById = (id) => {
    return smsCredentialsRepository.deleteById(id);
};
