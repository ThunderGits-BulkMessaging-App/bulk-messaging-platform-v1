const Contact = require('../Models/Contact');
const Group = require('../Models/Group');
const TeMplate = require('../Models/Template');
const EmailCampaign = require('../Models/EmailCampaign');
const EmailCredential = require('../Models/EmailCredential');
const { sendBulkMail } = require('../services/mail.service.js'); // Assuming you moved logic to service
const Sent = require('../Models/Sent');
const CryptoJS = require('crypto-js');
const SECRET_KEY = process.env.EMAIL_ENCRYPTION_SECRET || "784e2ec8963a1e75d";

exports.sendMails = async ({ campaignId, organisationId, }) => {


    // 1. Fetch Campaign
    const campaign = await EmailCampaign.findById(campaignId).populate('groupIds').populate('templateId');
    if (!campaign) {
        return { success: false, message: 'Campaign not found' };
    }

    const credential = await EmailCredential.findOne({ organisation: organisationId });
    if (!credential) {
        return { success: false, message: "Email credential not found" };
    }

    // Decrypt the password
    const bytes = CryptoJS.AES.decrypt(credential.password, SECRET_KEY);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    credential.password = decryptedPassword; // Update the credential with decrypted password
    // Now you can use decryptedPassword for sending emails


    // 3. Fetch all contacts in the campaign's groups
    const contacts = await Contact.find({ groups: { $in: campaign.groupIds } });

    // 4. Get content (from template or raw body)
    const templateContent = campaign.templateId ? campaign.templateId.content : campaign.body;

    credential.useSendGrid = true
    // 5. Send mails using customized template
    const results = await sendBulkMail(contacts, campaign.subject, templateContent, credential);
    console.log(results)

    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    await new Sent({
        organisation: organisationId,
        groupId: campaign.groupIds[0],
        messageType: 'Email',
        senderId: credential.email,
        templateId: campaign.templateId?._id?.toString(),
        content: campaign.templateId ? campaign.templateId.content : campaign.body,
        status: failCount > 0 ? (successCount > 0 ? 'Partial' : 'Failed') : 'Sent',
        additionalInfo: {
            subject: campaign.subject,
            totalSent: successCount.toString(),
            totalFailed: failCount.toString(),
            details: JSON.stringify(results)
        }
    }).save();



    // 7. Update Campaign Status
    campaign.status = 'sent';
    await campaign.save();

    return {
        successCount,
        failCount,
        results
    };
};
