const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Url for video is require"],
  },
  size: Number,
  duration: String,
  upload_at: {
    type: Date,
    default: Date.now(),
  },
  belong_to: {
    type: mongoose.Types.ObjectId,
    required: [true, "Video must belong to one user"],
  },
  like: {
    type: Number,
    default: 0,
  },
  favorite: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: [true, "Video must have content"],
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
