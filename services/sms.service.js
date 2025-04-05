// sms.service.js
const unirest = require("unirest");

/**
 * Send SMS using Fast2SMS.
 * @param {string} apiKey - Your Fast2SMS API key.
 * @param {string} senderId - Your DLT registered sender ID.
 * @param {string} messageTemplateId - Template ID of your registered message.
 * @param {string} variableValues - Values for the variables in the template.
 * @param {string} numbers - Comma-separated list of phone numbers.
 */
exports.sendSMS = async (apiKey, senderId, messageTemplateId, variableValues, numbers) => {
    return new Promise((resolve, reject) => {
        var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

        req.headers({
            "authorization": apiKey
        });

        req.form({
            "sender_id": senderId,
            "message": messageTemplateId,
            "variables_values": variableValues,
            "route": "dlt",
            "numbers": numbers,
        });

        req.end(function (res) {
            if (res.error) {
                console.error('SMS Service Error:', res.error);
                reject(new Error(res.error));
            } else {
                console.log('SMS Service Response:', res.body);
                resolve(res.body);
            }
        });
    });
};
