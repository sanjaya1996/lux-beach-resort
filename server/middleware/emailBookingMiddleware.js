const nodeMailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');

const generateToken = require('../utils/generateToken');

// SEND EMAIL TO GUEST AND
const emailBookingRequest = (req, res) => {
  let transporter = nodeMailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  // req.body should contain {name, phone, email, roomId, checkInDate, checkOutDate}
  const emailToken = generateToken(req.body);
  console.log(emailToken);

  // Set url LInk
  const url = `http://${req.headers.host}/api/bookings/email-booking/${emailToken}`;

  // setup email data with unicode symbols
  let mailOptions = {
    to: req.body.email,
    from: '11801709@students.koi.edu.au',
    subject: 'Confirm Email',
    html: `
    <h1>Please confirm your booking:</h1>
    <a href= ${url} style = "padding: 0.4rem 0.9rem;
    display: inline-block;
    font-size: 20px;
    color: #fff;
    height: 40px;
    background: #255796;
    border: 1px solid #255796;
    border-radius: 21px;
    letter-spacing: 3px;
    text-decoration: none;
    text-transform: uppercase;">
    Confirm Booking
  </a>`,
  };

  //Send Email
  transporter.sendMail(mailOptions);

  res.json({ message: 'Email Sent!' });
};

const emailBookingConfirmed = async (req, res, next) => {
  try {
    const { bookingDetails } = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    // Setting up variables for other middlewares
    req.body = bookingDetails;
    req.params.roomId = bookingDetails.roomId;
    req.type = 'email-booking';

    next();
  } catch (error) {
    const newError = new Error('Token failed');
    next(newError);
  }
};

module.exports = { emailBookingRequest, emailBookingConfirmed };
