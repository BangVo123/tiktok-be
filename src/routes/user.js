const express = require("express");
const protect = require("../middlewares/protect");
const UserController = require("../controllers/userController");
const router = express.Router();

router.use(protect);
router.get("/:userId", UserController.getUserInfo);
router.get("/", UserController.getCurUserInfo);

module.exports = router;
