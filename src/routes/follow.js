const express = require("express");
const protect = require("../middlewares/protect");
const FollowController = require("../controllers/followController");

const router = express.Router();

router.use(protect);

router.post("/", FollowController.follow);

module.exports = router;
