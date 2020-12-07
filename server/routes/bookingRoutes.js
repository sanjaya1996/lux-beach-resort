const express = require('express');
const { getBookings } = require('../controller/bookingController');

const router = express.Router();

router.get('/', getBookings);

module.exports = router;
