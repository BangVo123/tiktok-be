const express = require("express");
const router = express.Router();

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/upload", require("./upload"));
router.use("/api/v1/video", require("./video"));

module.exports = router;
