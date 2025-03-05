const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user_id"],
  },
  following_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide following_id"],
  },
});

const Follower = mongoose.model("Follower", followSchema);

module.exports = Follower;
