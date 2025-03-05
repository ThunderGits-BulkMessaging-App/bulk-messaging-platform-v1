// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set the API key

// exports.sendBulkEmail = async (recipients, subject, textContent, htmlContent) => {

//     const message = {
//         to: recipients, // Array of recipient emails
//         from: 'tommyshelbyisimmortal@outlook.com', // Your verified sender address
//         subject: subject,
//         text: textContent,
//         html: htmlContent,
//     };

//     try {
//         const res = await sgMail.sendMultiple(message);
//         console.log(res);

//         return { res, success: true };
        
//     } catch (error) {
//         console.error('Error sending emails:', error);
//         throw error;
//     }
// };


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ashu.abhishekksj@gmail.com",
        pass: "bmaw gbjx iero myeq"
    }
});



const sendEmail = async (email, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: `Email sent to ${email}` };
    } catch (error) {
        return { success: false, message: `Failed to send email to ${email}: ${error}` };
    }
}

module.exports = {
    sendEmail
};
