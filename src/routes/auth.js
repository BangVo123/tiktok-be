const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/authController");
const protect = require("../middlewares/protect");
require("dotenv").config();

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, res) => {
    // console.log(req.session);
    res.redirect("http://localhost:3000");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: true }),
  (req, res) => res.redirect("http://localhost:3000")
);

router.get("/", protect, AuthController.getUser);

module.exports = router;
