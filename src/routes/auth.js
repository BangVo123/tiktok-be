const express = require("express");
const AuthController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const {
  authCallbackMiddleware,
  authMiddleware,
  localAuth,
} = require("../middlewares/auth");
const redirect = require("../middlewares/redirect");
const passport = require("passport");
require("dotenv").config();

const router = express.Router();

router.get("/google", authMiddleware("google"));
router.get("/google/callback", authCallbackMiddleware("google"), redirect);

router.get("/facebook", authMiddleware("facebook"));
router.get("/facebook/callback", authCallbackMiddleware("facebook"), redirect);

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: true }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login success", data: user });
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", { session: true }, (err, user, info) => {
    if (err) return next(err);

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Signup success", data: user });
    });
  })(req, res, next);
});

router.post("/verify", AuthController.sendCode);

router.post("/reset", (req, res, next) => {
  passport.authenticate("reset", { session: true }, (err, user, info) => {
    if (err) return next(err);

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ message: "Reset password success", data: user });
    });
  })(req, res, next);
});

router.use(protect);

router.get("/logout", AuthController.logout);

module.exports = router;
