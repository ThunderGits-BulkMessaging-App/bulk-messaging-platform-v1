const Contact = require('../Models/Contact');
const Group = require('../Models/Group');
const TeMplate = require('../Models/Template');
const EmailCampaign = require('../Models/EmailCampaign');
const EmailCredential = require('../Models/EmailCredential');
const { sendBulkMail } = require('../services/mail.service.js'); // Assuming you moved logic to service
const Sent = require('../Models/Sent');

exports.sendMails = async (req, res) => {
  const { campaignId, selectedEmail } = req.body;

  // 1. Fetch Campaign
  const campaign = await EmailCampaign.findById(campaignId).populate('groupIds').populate('templateId');
  if (!campaign) {
    return res.status(404).json({ success: false, message: 'Campaign not found' });
  }

  // 2. Get email credentials
  const credential = await EmailCredential.findOne({ userId: req.user._id, email: selectedEmail });
  if (!credential) {
    return res.status(400).json({ success: false, message: "Email credential not found" });
  }

  // 3. Fetch all contacts in the campaign's groups
  const contacts = await Contact.find({ groups: { $in: campaign.groupIds } });

  // 4. Get content (from template or raw body)
  const templateContent = campaign.templateId ? campaign.templateId.content : campaign.body;

  // 5. Send mails using customized template
  const results = await sendBulkMail(contacts, campaign.subject, templateContent, credential);

  const successCount = results.filter(r => r.success).length;
  const failCount = results.length - successCount;

  // 6. Log into "Sent"
  await new Sent({
    userId: req.user._id,
    subject: campaign.subject,
    groupId: campaign.groupIds[0], // log one group or handle multiple
    message: campaign.templateId ? campaign.templateId.name : 'Custom message',
    totalSent: successCount,
    totalFailed: failCount,
    details: results
  }).save();

  // 7. Update Campaign Status
  campaign.status = 'sent';
  await campaign.save();

  res.status(200).json({
    success: true,
    message: `Emails sent. Success: ${successCount}, Failed: ${failCount}`,
    details: results
  });
};
