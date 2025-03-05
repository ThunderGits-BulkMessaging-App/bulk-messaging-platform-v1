const sgMail = require("@sendgrid/mail");
const nodemailer = require('nodemailer');

// const sendMail = (mails, subject, message, template) => {
//   sgMail.setApiKey(process.env.Mail_Secret);
//   const msg = {
//     to: mails,
//     from: "vishnusatheeshdev@gmail.com",
//     subject: subject,
//     text: message,
//   };

//   if (template !== " ") {
//     msg.html = template;
//   }

//   sgMail;
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const sendBulkMail = async (recipients, subject, message) => {
  
  for (let recipient of recipients) {
    const result = await sendEmail(recipient, subject, message);
    if (!result.success) {
      return res.status(500).json(result);
    }
  }
  return { message: "Emails sent successfully." }
};


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


module.exports = { sendBulkMail };
