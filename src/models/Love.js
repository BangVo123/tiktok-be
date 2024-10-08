const mongoose = require("mongoose");
const Video = require("./Video");

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

loveSchema.pre("save", async function (next) {
  const foundVideo = await Video.findById(this.video_id);
  foundVideo.love = foundVideo.love + 1;
  await foundVideo.save();

  next();
});

loveSchema.pre("deleteOne", async function (next) {
  const foundVideo = await Video.findById(this.video_id);
  foundVideo.love = foundVideo.love - 1;
  await foundVideo.save();

  next();
});

const Love = mongoose.model("Love", loveSchema);

module.exports = Love;
