const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide user_id"],
    select: false,
  },
  video_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide following_id"],
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
