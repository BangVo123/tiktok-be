const asyncHandler = require("../helper/asyncHandler");
const CommentService = require("../services/comment");

class CommentController {
  static createComment = asyncHandler(async (req, res, next) => {
    const comment = await CommentService.createComment(req?.body);

    res.status(201).json({
      message: "Success",
    });
  });

  static getComments = asyncHandler(async (req, res, next) => {
    const comments = await CommentService.getComments({
      page: req.query?.page,
      limit: req.query?.limit,
      videoId: req.params.videoId,
    });

    res.status(200).json({
      message: "Success",
      data: comments,
    });
  });

  static deleteComment = asyncHandler(async (req, res, next) => {
    await CommentService.deleteComment(req.params.commentId);

    res.status(200).json({ message: "Success" });
  });
}

module.exports = CommentController;
