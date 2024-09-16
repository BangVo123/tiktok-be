const Video = require("../models/Video");

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

    console.log({
      videos,
      page,
      limit,
      skip,
    });
    return videos;
  };
}

module.exports = VideoService;
