const repo = require('../repository/emailCredential.repository.js');
const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.EMAIL_ENCRYPTION_SECRET || "784e2ec8963a1e75d"; // move to .env


const stripPassword = (credential) => {
    const { password, ...safe } = credential.toObject();
    return safe;
}

exports.createCredential = async (organisationId, data) => {
    const existing = await repo.findByUserIdAndEmail(organisationId, data.email);
    if (existing) {
        const error = new Error("You already have credentials saved for this email.");
        error.status = 400;
        throw error;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(data.password, SECRET_KEY).toString();
    const credential = await repo.create({ ...data, organisation: organisationId, password: encryptedPassword });
    return stripPassword(credential);
};


exports.getCredentialsByUser = async (organisationId) => {
    const creds = await repo.findByOrganisationId(organisationId);
    return creds.map(stripPassword);
};

exports.updateCredential = async (id, data, organisationId) => {
    const credential = await repo.findById(id);
    if (!credential || credential.organisation.toString() !== organisationId.toString()) return null;
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, SECRET_KEY).toString();
    let updatedData = await repo.update(id, { ...data, password: encryptedPassword });
    return stripPassword(updatedData);
};

exports.deleteCredential = async (id, organisationId) => {
    const credential = await repo.findById(id);
    if (!credential || credential.organisation.toString() !== organisationId.toString()) return null;
    return repo.remove(id);
};
