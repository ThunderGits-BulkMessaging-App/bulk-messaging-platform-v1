const contactRepository = require('../repository/contact.repository.js');
const csv = require('csv-parser');
const fs = require('fs');
const readExcelFile = require('read-excel-file/node');
const Group = require('../Models/Group.js'); // Ensure this is correctly required

exports.createContact = async (contactData) => {
    let group;

    if (contactData.groupName) {
        group = await Group.findOne({ groupName: contactData.groupName }).populate("members");
        console.log(group)
        if (!group) {
            group = new Group({ organisation: contactData.organisation, groupName: contactData.groupName });
            await group.save();
        }

        const numberExistInGrp = group.members.some(item => String(item.phoneNumber) === String(contactData.phoneNumber))
        if (numberExistInGrp) {
            throw new Error("Number already added in this group")
        }

        contactData.groups = [group._id]; // Assign group id to the contact
    }

    delete contactData.groupName; // Remove groupName field if it exists

    // Create the contact first
    const newContact = await contactRepository.create(contactData);

    // If group exists, add the contact to group's members
    if (group) {
        await Group.findByIdAndUpdate(
            group._id,
            { $addToSet: { members: newContact._id } }, // $addToSet prevents duplicates
            { new: true }
        );
    }

    return newContact;
};


exports.getAllContacts = async (organisation) => {
    return await contactRepository.findAll(organisation);
};

exports.updateContact = (id, updateData) => {
    return contactRepository.update(id, updateData);
};

exports.deleteContact = (id) => {
    return contactRepository.delete(id);
};




exports.parseContacts = (filePath, userId) => {
    return new Promise((resolve, reject) => {
        const operations = []; // Store all async operations here
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const op = processDataRow(data, userId)
                    .then(processedData => {
                        return processedData; // This will be your modified data
                    })
                    .catch(error => {
                        reject(error); // You might want to handle errors differently
                    });
                operations.push(op); // Add promise to the operations array
            })
            .on('end', () => {
                Promise.all(operations) // Wait for all operations to complete
                    .then(results => {
                        resolve(results); // Now we can safely resolve with all processed data
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function processDataRow(data, userId) {
    if (data.groupName) {
        let group = await Group.findOne({ groupName: data.groupName });
        if (!group) {
            group = new Group({ groupName: data.groupName });
            await group.save();
        }
        data.groups = [group._id];
    }
    delete data.groupName;
    data.createdBy = userId;
    return data; // Return modified data
}


exports.bulkCreateContacts = (contacts) => {
    return contactRepository.bulkCreate(contacts);
};
