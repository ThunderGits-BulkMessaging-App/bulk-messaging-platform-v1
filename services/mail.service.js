const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

// Set SendGrid API key globally
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("✅ SendGrid API Key Loaded");
} else {
    console.warn("❌ No SendGrid API Key found in environment");
}

exports.sendBulkMail = async (contacts, subject, template, credential) => {
    const results = [];

    // Optional: Create nodemailer transporter only if needed
    let transporter = null;
    if (!credential.useSendGrid) {
        // ✅ Create a Nodemailer transporter with SMTP
        transporter = nodemailer.createTransport({
            host: credential.host || "smtp.gmail.com",
            port: credential.port || 465,
            secure: credential.secure || true, // true = use SSL
            auth: {
                user: credential.email,
                pass: credential.password,
            },
        });
    }

    // Loop through contacts and send personalized emails
    for (let contact of contacts) {
        // 🔄 Replace placeholders like {{name}}, {{email}} etc.
        const personalizedHtml = template
            .replace(/{{name}}/g, contact.firstName || '')
            .replace(/{{lastName}}/g, contact.lastName || '')
            .replace(/{{email}}/g, contact.email || '')
            .replace(/{{phoneNumber}}/g, contact.phoneNumber || '');

        // Prepare common fields
        const toEmail = contact.email;
        const fromEmail = credential.from || "no-reply@thundergts.com";

        try {
            if (credential.useSendGrid) {
                // ✅ Send using SendGrid
                const msg = {
                    to: toEmail,
                    from: "prem@thundergits.com", // Must be verified on SendGrid
                    subject,
                    html: personalizedHtml,
                };

                await sgMail.send(msg);
            } else {
                // ✅ Send using Nodemailer
                const mailOptions = {
                    from: `"Thunder GTS" <${fromEmail}>`,
                    to: toEmail,
                    subject,
                    html: personalizedHtml,
                };

                await transporter.sendMail(mailOptions);
            }

            results.push({ email: toEmail, success: true });

        } catch (error) {
            console.error(`❌ Error sending to ${toEmail}:`, error.response?.body || error.message);
            results.push({
                email: toEmail,
                success: false,
                message: error.message,
            });
        }
    }

    return results;
};
