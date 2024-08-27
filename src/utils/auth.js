const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const AuthService = require("../services/auth");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await AuthService.findOrCreate(profile);
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "name", "picture", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await AuthService.findOrCreate(profile, "facebook");
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("serialize user id", user._id);
  done(null, user.account_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ account_id: id });
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err);
  }
});
