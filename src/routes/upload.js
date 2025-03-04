const express = require("express");
const protect = require("../middlewares/protect");
const { uploadMemory } = require("../services/multer");
const UploadController = require("../controllers/uploadController");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  protect,
  uploadMemory.single("file"),
  UploadController.uploadVideo
);

router.post(
  "/avatar",
  uploadMemory.single("avatar"),
  UploadController.uploadAvatar
);

module.exports = router;
