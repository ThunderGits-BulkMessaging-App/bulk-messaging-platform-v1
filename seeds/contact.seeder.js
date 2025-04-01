const mongoose = require('mongoose');
const Contact = require('./contact.model');

const contacts = [
    { firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', email: 'john.doe@example.com' },
    { firstName: 'Jane', lastName: 'Doe', phoneNumber: '0987654321', email: 'jane.doe@example.com' }
];

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const createdContacts = await Contact.insertMany(contacts);
        console.log(`${createdContacts.length} contacts have been successfully seeded.`);
        mongoose.disconnect();
    })
    .catch((err) => {
        console.error('Error seeding contacts:', err);
        mongoose.disconnect();
    });
