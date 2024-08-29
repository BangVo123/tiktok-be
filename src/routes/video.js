const express = require("express");
const protect = require("../middlewares/protect");
const VideoController = require("../controllers/videoController");

const router = express.Router();

router.use("/", protect);
router.post("/", VideoController.addVideo);

module.exports = router;
