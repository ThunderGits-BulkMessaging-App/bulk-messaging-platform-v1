// services/credential.service.js
const credentialRepository = require('../repository/credential.repository');

exports.createCredential = (credentialData) => {
    return credentialRepository.createCredential(credentialData);
};

exports.getAllCredentials = (userId) => {
    return credentialRepository.findAllCredentialsByUserId(userId);
};

exports.getCredentialById = (id) => {
    return credentialRepository.findCredentialById(id);
};

exports.getCredentialsByType = (userId, type) => {
    return credentialRepository.findCredentialsByUserIdAndType(userId, type);
};

exports.updateCredentialById = (id, updateData) => {
    return credentialRepository.updateCredential(id, updateData);
};

exports.deleteCredentialById = (id) => {
    return credentialRepository.deleteCredential(id);
};
