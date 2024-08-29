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
}

module.exports = VideoController;
