const nodemailer = require('nodemailer');

// Replace 'your-email@gmail.com' and 'your-app-password' with your actual email and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kaiyuanwang2089@gmail.com', // Use the Gmail address you intend to send emails from
    pass: 'wado ldky awdq frot', // Use your App Password if 2FA is enabled, otherwise your Gmail password
  },
});

const mailOptions = {
  from: 'kaiyuanwang2089@gmail.com', // Sender address must be the same as authenticated user
  to: 'kaiyuanwang2089@gmail.com', // Replace it with the recipient's email address
  subject: 'Nodemailer Test', // Subject line
  text: 'Hello from Nodemailer! This is a test email.', // Plain text body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
