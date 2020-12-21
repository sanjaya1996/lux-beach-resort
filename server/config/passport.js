const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require('./db.js');

module.exports = function (passport) {
  // Serialize and Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM guests WHERE id = $1', [id], (err, res) =>
      done(err, res.rows[0])
    );
  });

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:5000/api/auth/facebook/callback',
        profileFields: [
          'id',
          'displayName',
          'gender',
          'picture.type(large)',
          'email',
        ],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
};
