const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const User = require("../models/User");
const AppError = require("./error");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        let user = await User.findOne({ google_id: profile.id });
        if (!user) {
          user = await User.create({
            full_name: profile.displayName,
            email: profile.emails[0].value,
            google_id: profile.id,
            avatar: profile.photos[0].value,
          });
        }
        console.log(user);
        cb(null, user);
      } catch (err) {
        cb(err, null);
      }
    }
  )
);
