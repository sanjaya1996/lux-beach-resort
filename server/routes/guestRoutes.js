const express = require('express');
const { getGuests } = require('../controller/guestController');

const router = express.Router();

router.get('/', getGuests);

router.get('/current', (req, res) => {
  console.log(req.isAuthenticated());
});

module.exports = router;
