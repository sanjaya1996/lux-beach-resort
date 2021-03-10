const express = require('express');
const {
  getGuests,
  getProfile,
  updateProfile,
  getGuestById,
  updateGuest,
  deleteGuest,
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

router
  .route('/:id')
  .get(checkAdmin, getGuestById)
  .put(checkAdmin, updateGuest)
  .delete(checkAdmin, deleteGuest);

module.exports = router;
