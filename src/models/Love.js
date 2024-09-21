const mongoose = require("mongoose");

const loveSchema = new mongoose.Schema({
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

const Love = mongoose.model("Love", loveSchema);

module.exports = Love;
