const nodeMailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');

const generateToken = require('../utils/generateToken');

// Verifybooking
const verifyEmail = (req, res) => {
  let transporter = nodeMailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  // req.body should contain {name, phone, email, checkInDate, checkOutDate}
  const emailToken = generateToken(req.body);

  // Set url LInk
  const url = `http://${req.headers.host}/api/guests/auth/email-confirmation/${emailToken}`;

  // setup email data with unicode symbols
  let mailOptions = {
    to: email,
    from: '11801709@students.koi.edu.au',
    subject: 'Confirm Email',
    html: `
    <p>Please confirm your email by clicking in this link:</p>
    <a href= ${url}>${url}</a>`,
  };

  //Send Email
  transporter.sendMail(mailOptions);

  res.json({ message: 'Email Sent!' });
};

const confirmEmailLink = async (req, res, next) => {
  try {
    const { bookingDetails } = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    // Setting up variables for other middlewares
    req.body = bookingDetails;
    req.params.roomId = bookingDetails.roomId;

    next();
  } catch (error) {
    const newError = new Error('Token failed');
    next(newError);
  }
};

module.exports = { verifyEmail, confirmEmailLink };
