const contactService = require('../services/contact.service');

exports.createContact = async (req, res) => {
    try {
        console.log(req.body);
        const contactData = { ...req.body, createdBy: req.user._id }; // Include createdBy
        const contact = await contactService.createContact(contactData);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await contactService.updateContact(req.params.id, req.body);
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        await contactService.deleteContact(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.bulkUploadContacts = async (req, res) => {
    try {
        const filePath = req.file.path;
        const contacts = await contactService.parseContacts(filePath, req.user._id); // Pass user ID to service
        console.log(contacts);
        await contactService.bulkCreateContacts(contacts);
        res.status(201).json({ message: 'Contacts uploaded successfully' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message });
    }
};