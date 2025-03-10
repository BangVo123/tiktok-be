const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const AuthService = require("../services/auth");
const User = require("../models/User");
const AppError = require("./error");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, done) => {
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
    async (_, __, profile, done) => {
      try {
        const user = await AuthService.findOrCreate(profile, "facebook");
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { code, action } = req.body;

      console.log(action);

      switch (action) {
        case "login":
          await AuthService.login({ username, password, cb: done });
          break;
        case "signup":
          await AuthService.signup({
            username,
            password,
            verifyCode: code,
            cb: done,
          });
          break;
        default:
          throw new AppError("Something went wrong", 400);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
