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
}

module.exports = VideoService;
