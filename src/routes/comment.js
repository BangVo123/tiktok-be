const express = require("express");
const protect = require("../middlewares/protect");
const CommentController = require("../controllers/commentController");

const router = express.Router();

router.use(protect);
router.get("/:videoId", CommentController.getComments);
router.post("/", CommentController.createComment);
router.delete("/:commentId", CommentController.deleteComment);

module.exports = router;
    