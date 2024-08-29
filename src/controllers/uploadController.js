const asyncHandler = require("../helper/asyncHandler");
const { uploadVideo } = require("../services/upload");
const Video = require("../models/Video");

class UploadController {
  static uploadVideo = asyncHandler(async (req, res, next) => {
    console.log(req.file);
    const result = await uploadVideo({
      fileBuffer: req.file.buffer,
      userId: req.user.id,
    });

    const resData = {
      name: req.file.originalname,
      url: result.secure_url,
      size: result.bytes,
      width: result.width,
      height: result.height,
      duration: result.duration,
    };
    res.status(200).json({
      status: "Success",
      data: resData,
    });
  });
}

module.exports = UploadController;
