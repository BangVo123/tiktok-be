const Video = require("../models/Video");
const Like = require("../models/Like");
const Love = require("../models/Love");

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
    const findLike = await Like.findOne({
      user_id: userId,
      video_id: videoId,
    });
    if (findLike) {
      video.like = video.like - 1;
      await findLike.deleteOne();
    } else {
      video.like = video.like + 1;
      await Like.create({
        user_id: userId,
        video_id: videoId,
      });
    }
    await video.save();
  };

  static loveVideo = async ({ videoId, userId }) => {
    const video = await Video.findById(videoId);
    const findLove = await Love.findOne({
      user_id: userId,
      video_id: videoId,
    });
    if (findLove) {
      video.love = video.love - 1;
      await findLove.deleteOne();
    } else {
      video.love = video.love + 1;
      await Love.create({
        user_id: userId,
        video_id: videoId,
      });
    }
    await video.save();
  };

  static getFavorite = async ({ userId }) => {
    const likesRes = await Like.find({ user_id: userId })
      .select("video_id -_id")
      .lean();
    const lovesRes = await Love.find({ user_id: userId })
      .select("video_id -_id")
      .lean();

    const likes = likesRes.map((like) => like.video_id);
    const loves = lovesRes.map((love) => love.video_id);
    // console.log(likes, loves)
    return {
      likes,
      loves,
    };
  };
}

module.exports = VideoService;
