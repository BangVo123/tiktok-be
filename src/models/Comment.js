const mongoose = require("mongoose");
const Video = require("./Video");
const AppError = require("../utils/error");

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

commentSchema.pre("save", async function (next) {
  const foundVideo = await Video.findById(this.belong_to);

  if (!foundVideo) throw new AppError("Something went wrong", 400);

  foundVideo.comment = foundVideo.comment + 1;
  await foundVideo.save();

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
