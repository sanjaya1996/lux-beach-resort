const express = require('express');
const {
  getGuests,
  getProfile,
  updateProfile,
} = require('../controller/guestController');
const { checkAuth, checkAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', checkAdmin, getGuests);

router
  .route('/profile')
  .get(checkAuth, getProfile)
  .put(checkAuth, updateProfile);

router.get('/current', (req, res) => {
  console.log(req.isAuthenticated());
});

module.exports = router;
