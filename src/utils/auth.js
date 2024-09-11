const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
require("dotenv").config();
const AuthService = require("../services/auth");
const User = require("../models/User");
const AppError = require("./error");
const DigitCode = require("../models/DigitCode");

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

// passport.use(
//   "local",
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//       const { action } = req.body;
//       try {
//         const foundUser = await User.findOne({
//           $or: [{ email: username }, { phone_nums: username }],
//         });

//         if (action === "login") {
//           if (!foundUser) return done(new AppError("User not found", 404));
//           const comparePass = await bcrypt.compare(
//             password,
//             foundUser.password
//           );
//           if (!comparePass)
//             return done(new AppError("Email or password not correct", 404));
//           return done(null, foundUser);
//         } else if (action === "signup") {
//           if (foundUser) return done(new AppError("User already exists"));
//           const newUser = await AuthService.createLocalUser({
//             username,
//             password,
//           });
//           return done(null, newUser);
//         }
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ email: username }, { phone_nums: username }],
          provider: null,
        });

        if (!foundUser) return done(new AppError("User not found", 404));
        const comparePass = await bcrypt.compare(password, foundUser.password);
        if (!comparePass)
          return done(new AppError("Email or password not correct", 404));
        return done(null, foundUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { code } = req.body;
        const getCode = await DigitCode.findOne({
          email: username,
          type: "auth",
        });
        if (code !== getCode.code)
          throw new AppError("Verification code is not valid", 400);
        if (getCode.expired_at < Date.now())
          throw new AppError("Verification code is expired. Try again", 400);
        await DigitCode.deleteOne({ email: username });

        const foundUser = await User.findOne({
          $or: [{ email: username }, { phone_nums: username }],
          provider: null,
        });

        if (foundUser) return done(new AppError("User already exists"));
        const newUser = await AuthService.createLocalUser({
          username,
          password,
        });
        return done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "reset",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { code } = req.body;

        const foundUser = await User.findOne({
          $or: [{ email: username }, { phone_nums: username }],
          provider: null,
        });

        if (!foundUser) return done(new AppError("User not found", 404));

        const getCode = await DigitCode.findOne({
          email: username,
          type: "reset",
        });
        if (!getCode) throw new AppError("Verification code is not found", 404);
        if (getCode.expired_at < Date.now())
          throw new AppError("Verification code is expired");
        if (getCode.code !== code)
          throw new AppError("Verification code does not match", 400);

        foundUser.password = password;
        await foundUser.save();

        return done(null, foundUser);
      } catch (err) {
        done(err);
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
