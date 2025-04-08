const nodemailer = require('nodemailer');



exports.sendBulkMail = async (contacts, subject, template, credential) => {
    const transporter = nodemailer.createTransport({
        service: credential.service || "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: credential.email,
            pass: credential.password
        }
    });

    const results = [];

    for (let contact of contacts) {
        // Replace variables like {{firstName}}, {{email}} etc.
        let personalizedHtml = template;
        personalizedHtml = personalizedHtml.replace(/{{name}}/g, contact.firstName);
        personalizedHtml = personalizedHtml.replace(/{{lastName}}/g, contact.lastName);
        personalizedHtml = personalizedHtml.replace(/{{email}}/g, contact.email || '');
        personalizedHtml = personalizedHtml.replace(/{{phoneNumber}}/g, contact.phoneNumber || '');

        const mailOptions = {
            from: credential.email,
            to: contact.email,
            subject: subject,
            html: personalizedHtml
        };

        try {
            await transporter.sendMail(mailOptions);
            results.push({ email: contact.email, success: true });
        } catch (error) {
            results.push({ email: contact.email, success: false, message: error.message });
        }
    }

    return results;
};
