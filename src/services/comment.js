const Comment = require("../models/Comment");

class CommentService {
  static createComment = async ({
    content,
    belong_to,
    sender,
    parent = null,
  }) => {
    return await Comment.create({ content, belong_to, sender, parent });
  };

  static getComments = async ({ page = 1, limit = 10, videoId }) => {
    return await Comment.find({ belong_to: videoId })
      .populate("sender", "_id full_name avatar")
      .skip((page - 1) * limit)
      .limit(limit);
  };

  //update number of love for video

  static deleteComment = async (videoId) => {
    return await Comment.deleteOne({ belong_to: videoId });
  };
}

module.exports = CommentService;
