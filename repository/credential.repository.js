// repositories/CredentialRepository.js

const Credential = require('../Models/Credential');

const createCredential = async (credentialData) => {
    return await Credential.create(credentialData);
};

const updateCredential = async (id, credentialData) => {
    return await Credential.findByIdAndUpdate(id, credentialData, { new: true });
};

const findCredentialById = async (id) => {
    return await Credential.findById(id);
};

const deleteCredential = async (id) => {
    return await Credential.findByIdAndDelete(id);
};

const findAllCredentialsByUserId = async (userId) => {
    return await Credential.find({ userId: userId });
};
const findCredentialsByUserIdAndType = async (userId, type) => {
    return await Credential.find({ userId: userId, type: type });
};


module.exports = {
    createCredential,
    updateCredential,
    findCredentialById,
    deleteCredential,
    findAllCredentialsByUserId,
    findCredentialsByUserIdAndType
};
