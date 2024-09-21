const express = require("express");
const protect = require("../middlewares/protect");
const VideoController = require("../controllers/videoController");

const router = express.Router();

router.get("/", VideoController.getVideos);
router.use("/", protect);
router.post("/", VideoController.addVideo);
router.post("/like/:videoId", VideoController.likeVideo);
router.post("/love/:videoId", VideoController.loveVideo);

module.exports = router;
