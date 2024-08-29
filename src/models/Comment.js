const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Comment must have content"],
  },
  like: {
    type: Number,
    default: 0,
  },
  belong_to: {
    type: mongoose.Types.ObjectId,
    required: [true, "Comment must belong to one video"],
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: [true, "Comment must belong to one user"],
  },
  parent: mongoose.Types.ObjectId,
});

const Comment = mongoose.model(("Comment", commentSchema));

module.exports = Comment;
