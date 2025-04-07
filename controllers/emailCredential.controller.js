const service = require('../services/emailCredential.service.js');

exports.createCredential = async (req, res) => {
  try {
    const credential = await service.createCredential(req.user._id, req.body);
    res.status(201).send(credential);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCredentials = async (req, res) => {
  try {
    const credentials = await service.getCredentialsByUser(req.user._id);
    res.status(200).send(credentials);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateCredential = async (req, res) => {
  try {
    const updated = await service.updateCredential(req.params.id, req.body, req.user._id);
    if (!updated) return res.status(404).send({ message: 'Credential not found or unauthorized' });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteCredential = async (req, res) => {
  try {
    const deleted = await service.deleteCredential(req.params.id, req.user._id);
    if (!deleted) return res.status(404).send({ message: 'Credential not found or unauthorized' });
    res.status(200).send({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
