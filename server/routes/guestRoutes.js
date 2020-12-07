const express = require('express');
const { getGuests } = require('../controller/guestController');

const router = express.Router();

router.get('/', getGuests);

module.exports = router;
