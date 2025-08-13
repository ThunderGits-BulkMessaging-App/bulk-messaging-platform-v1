const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');


// we have to add key in email credential model
// SENDGRID_API_KEY and name





// Set SendGrid API key globally
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("✅ SendGrid API Key Loaded");
} else {
    console.warn("❌ No SendGrid API Key found in environment");
}

exports.sendBulkMail = async (contacts, subject, template, credential) => {
    const results = [];

    let transporter = null;
    if (credential.service !== 'sendgrid') {
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
    } else {
        sgMail.setApiKey(credential.sendGridApiKey);
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
        const fromEmail = credential.email || "no-reply@thundergts.com";
        const fromName = credential.fromName || "Thunder GTS";

        try {
            if (credential.service === 'sendgrid') {
                // ✅ Send using SendGrid
                const msg = {
                    to: toEmail,
                    from: {
                        name: fromName,
                        email: fromEmail
                    },
                    subject,
                    html: personalizedHtml,
                };

                await sgMail.send(msg);
            } else {
                // ✅ Send using Nodemailer
                const mailOptions = {
                    from: `"${fromName}" <${fromEmail}>`,
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
