const express = require('express');
const passport = require('passport');

const router = express.Router();

// Login with facebook route
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

// Login with google route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

// Get Currently authenticated User
router.get('/currentuser', (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  let user = null;
  if (req.user) {
    const { auth_id, ...userData } = req.user;
    user = userData;
  }
  res.json({ user, isAuthenticated });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
