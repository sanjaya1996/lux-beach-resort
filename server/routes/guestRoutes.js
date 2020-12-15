const express = require('express');
const { getGuests } = require('../controller/guestController');
const { verifyEmail } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getGuests);

router.post('/auth/verify-email', verifyEmail);

module.exports = router;
