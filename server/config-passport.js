const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./models/db');

passport.use(
  new LocalStrategy(async function(username, password, done) {
    try {
      const user = await db.getUserByName(username);
      if (user && user.isValidPassword(password)) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
