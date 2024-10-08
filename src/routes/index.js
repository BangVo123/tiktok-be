const express = require("express");
const router = express.Router();

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/upload", require("./upload"));
router.use("/api/v1/video", require("./video"));
router.use("/api/v1/follow", require("./follow"));
router.use("/api/v1/users", require("./user"));

module.exports = router;
