const repo = require('../repository/emailCredential.repository.js');
const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.EMAIL_ENCRYPTION_SECRET || "784e2ec8963a1e75d"; // move to .env


const stripPassword = (credential) => {
    const { password, ...safe } = credential.toObject();
    return safe;
}

exports.createCredential = async (userId, data) => {
    const existing = await repo.findByUserIdAndEmail(userId, data.email);
    if (existing) {
        const error = new Error("You already have credentials saved for this email.");
        error.status = 400;
        throw error;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(data.password, SECRET_KEY).toString();
    const credential = await repo.create({ ...data, userId, password: encryptedPassword });
    return stripPassword(credential);
};


exports.getCredentialsByUser = async (userId) => {
    const creds = await repo.findByUserId(userId);
    return creds.map(stripPassword);
};

exports.updateCredential = async (id, data, userId) => {
    const credential = await repo.findById(id);
    if (!credential || credential.userId.toString() !== userId.toString()) return null;
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, SECRET_KEY).toString();
    let updatedData = await repo.update(id, {...data, password: encryptedPassword});   
    return stripPassword(updatedData);
};

exports.deleteCredential = async (id, userId) => {
    const credential = await repo.findById(id);
    if (!credential || credential.userId.toString() !== userId.toString()) return null;
    return repo.remove(id);
};
