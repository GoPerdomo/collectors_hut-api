const nodemailer = require('nodemailer');

// Config Vars
const gmail = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;

// Nodemailer config
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmail,
    pass: gmailPass,
  }
});

// Contact Controllers
const contact = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from: `"Collectors Hut Contact" <${gmail}>`,
    to: gmail,
    subject: subject,
    html: `
        <b>Name</b>: ${name}<br>
        <b>Email</b>: ${email}<br>
        <b>Subject</b>: ${subject}<br>
        <b>Message</b>:<br> ${message}
      `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log('Message sent: %s', info.response);
  });
};

// Newsletter Controllers
const newsletter = (req, res, next) => {
  const { email } = req.body;

  const mailOptions = {
    from: `"Collectors Hut Newsletter" <${gmail}>`,
    to: gmail,
    subject: "Newsletter Subscription",
    text: `New subscription: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log('Message sent: %s', info.response);
  });
};


module.exports = {
  contact,
  newsletter,
};
