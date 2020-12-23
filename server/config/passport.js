const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require('./db.js');

// Find or Create user function after authProvider response
const findOrCreateUser = async (profile, done) => {
  const { displayName, emails, id, provider } = profile;
  const email = emails[0].value;

  try {
    const results = await db.query(
      'SELECT * FROM guests WHERE auth_id = $1 AND auth_provider_name= $2',
      [id, provider]
    );

    if (!results.rows.length) {
      const { rows } = await db.query(
        `INSERT INTO guests (name, email, auth_id, auth_provider_name) 
            VALUES($1, $2, $3, $4) RETURNING *`,
        [displayName, email, id, provider]
      );

      done(null, rows[0]);
    } else {
      const guest = results.rows[0];

      if (guest.name !== displayName) {
        const {
          rows: [updatedGuest],
        } = await db.query(
          `UPDATE guests
            SET name = $1 
            WHERE id = $2`,
          [displayName, guest.id]
        );

        done(null, updatedGuest);
      } else {
        done(null, guest);
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// MAIN PASSPORT EXPORT FUNCTION
module.exports = function (passport) {
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
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser(profile, done);
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
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser(profile, done);
      }
    )
  );

  // Serialize and Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM guests WHERE id = $1', [id]).then((res) => {
      done(null, res.rows[0]);
    });
  });
};
