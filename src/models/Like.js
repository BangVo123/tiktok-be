const mongoose = require("mongoose");
const User = require("./User");
const Video = require("./Video");

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

likeSchema.pre("save", async function (next) {
  const foundVideo = await Video.findById(this.video_id);
  foundVideo.like = foundVideo.like + 1;

  const foundUser = await User.findById(foundVideo.belong_to);
  foundUser.likes_count = foundUser.likes_count + 1;

  await foundUser.save();
  await foundVideo.save();
  next();
});

likeSchema.pre("deleteOne", async function (next) {
  const foundVideo = await Video.findById(this.video_id);
  foundVideo.like = foundVideo.like - 1;

  const foundUser = await User.findById(foundVideo.belong_to);
  foundUser.likes_count = foundUser.likes_count - 1;

  await foundUser.save();
  await foundVideo.save();
  next();
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
