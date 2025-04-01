const Contact = require('../Models/Contact.js');

exports.create = (contactData) => {
    const contact = new Contact(contactData);
    return contact.save();
};

exports.findAll = () => {
    return Contact.find();
};

exports.update = (id, updateData) => {
    return Contact.findByIdAndUpdate(id, updateData, { new: true });
};

exports.delete = (id) => {
    return Contact.findByIdAndDelete(id);
};

exports.bulkCreate = (contactsData) => {
    return Contact.insertMany(contactsData);
};