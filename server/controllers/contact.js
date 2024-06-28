const nodemailer = require('nodemailer');
const { productDataExtractor, userExtractor } = require('../utils/middleware')
const contactRouter = require('express').Router()
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


contactRouter.post('/',(req, res) => {
    console.log("Received contact request with query parameters:", req.body);

    const { 'firstname': firstname, 'lastname': lastname, 'company':company, 'email':email, 'phonenumber': phonenumber, 'message':message } = req.body;

    res.send(`Contact information received:
              First Name: ${firstname}
              Last Name: ${lastname}
              Company: ${company}
              Email: ${email}
              Phone Number: ${phonenumber}
              Message: ${message}`);




const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDER, // your Outlook email address
    pass: process.env.SENDERPASS, // your email password
  },
  tls: {
    ciphers: process.env.CIPHER,
  },
});

// Define the mail options
const mailOptions = {
  from:process.env.SENDER , // sender address
  to: process.env.RECEIVER, // recipient email address
  subject: 'Contact Us Form Submission',
  text: `
    First Name: ${firstname}
    Last Name: ${lastname}
    Company: ${company}
    Email: ${email}
    Phone Number: ${phonenumber}
    Message: ${message}
  `,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    return;
  }
  console.log('Email sent:', info.response);
});
});

module.exports = contactRouter
