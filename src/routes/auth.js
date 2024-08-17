const express = require("express");
const AuthController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const {
  authCallbackMiddleware,
  authMiddleware,
} = require("../middlewares/auth");
const redirect = require("../middlewares/redirect");
require("dotenv").config();

const router = express.Router();

router.get("/google", authMiddleware("google"));
router.get("/google/callback", authCallbackMiddleware("google"), redirect);

router.get("/facebook", authMiddleware("facebook"));
router.get("/facebook/callback", authCallbackMiddleware("facebook"), redirect);

router.use(protect);

router.get("/logout", AuthController.logout);

router.get("/", AuthController.getUser);

module.exports = router;
