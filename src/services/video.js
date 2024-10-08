const Video = require("../models/Video");
const Like = require("../models/Like");
const Love = require("../models/Love");
const User = require("../models/User");
const AppError = require("../utils/error");

class VideoService {
  static addVideo = async ({ url, size, duration, userId, content }) => {
    const video = await Video.create({
      url,
      size,
      duration,
      belong_to: userId,
      content,
    });

    return video;
  };

  static getVideos = async ({ page, limit }) => {
    const skip = (page - 1) * limit;

    const videos = await Video.find({})
      .populate(
        "belong_to",
        "full_name nick_name avatar bio tick followers_count likes_count"
      )
      .skip(skip)
      .limit(limit);

    return videos;
  };

  static likeVideo = async ({ videoId, userId }) => {
    const video = await Video.findById(videoId);
    if (!video) throw new AppError("Infomation of video not valid");

    const findLike = await Like.findOne({
      user_id: userId,
      video_id: videoId,
    });
    if (findLike) {
      return await findLike.deleteOne();
    } else {
      return await Like.create({
        user_id: userId,
        video_id: videoId,
      });
    }
  };

  static loveVideo = async ({ videoId, userId }) => {
    const video = await Video.findById(videoId);
    if (!video) throw new AppError("Infomation of video not valid");

    const findLove = await Love.findOne({
      user_id: userId,
      video_id: videoId,
    });
    if (findLove) {
      return await findLove.deleteOne();
    } else {
      return await Love.create({
        user_id: userId,
        video_id: videoId,
      });
    }
  };

  static getFavorite = async ({ userId }) => {
    const likes = await Like.distinct("video_id", { user_id: userId });
    const loves = await Love.distinct("video_id", { user_id: userId });

    return {
      likes,
      loves,
    };
  };
}

module.exports = VideoService;
