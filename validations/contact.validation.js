const Joi = require('joi');

exports.validateContact = (contactData) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
        email: Joi.string().email(),
        address: Joi.string(),
        groups: Joi.array().items(Joi.objectId())
    });
    return schema.validate(contactData);
};
