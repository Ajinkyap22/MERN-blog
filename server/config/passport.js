const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

// passport setup
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false, "Incorrect username");

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) return done(null, user);
        else return done(null, false, { message: "Incorrect password" });
      });
    });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
