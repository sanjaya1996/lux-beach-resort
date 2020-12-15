const jwt = require('jsonwebtoken');

const generateToken = (bookingDetails) => {
  return jwt.sign({ bookingDetails }, process.env.JWT_SECRET, {
    expiresIn: 10 * 60,
  });
};

module.exports = generateToken;
