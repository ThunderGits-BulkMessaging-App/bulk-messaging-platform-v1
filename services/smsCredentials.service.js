// services/smsCredentials.service.js
const smsCredentialsRepository = require('../repository/smsCredentials.repository');

exports.createSMSCredential = (credentialsData) => {
    return smsCredentialsRepository.create(credentialsData);
};

exports.getAllSMSCredentials = (organisation) => {
    return smsCredentialsRepository.findAll(organisation);
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
