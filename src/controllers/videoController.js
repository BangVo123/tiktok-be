const asyncHandler = require("../helper/asyncHandler");
const VideoService = require("../services/video");

class VideoController {
  static addVideo = asyncHandler(async (req, res, next) => {
    const video = await VideoService.addVideo({
      url: req.body.url,
      size: req.body.size,
      duration: req.body.duration,
      userId: req.user.id,
      content: req.body.content,
    });

    res.status(200).json({
      status: "Success",
      data: video,
    });
  });

  static getVideos = asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const videos = await VideoService.getVideos({ page, limit });

    res.status(200).json({
      message: "Get videos success",
      data: videos,
    });
  });

  static likeVideo = asyncHandler(async (req, res, next) => {
    await VideoService.likeVideo({
      videoId: req.params.videoId,
      userId: req.user.id,
    });

    res.sendStatus(200);
  });

  static loveVideo = asyncHandler(async (req, res, next) => {
    await VideoService.loveVideo({
      videoId: req.params.videoId,
      userId: req.user.id,
    });

    res.sendStatus(200);
  });
}

module.exports = VideoController;
