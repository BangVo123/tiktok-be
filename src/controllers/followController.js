const asyncHandler = require("../helper/asyncHandler");
const FollowService = require("../services/follow");

class FollowController {
  static follow = asyncHandler(async (req, res, next) => {
    const follow = await FollowService.follow({
      userId: req.user.id,
      followingId: req.body.followingId,
    });
    console.log("abc", follow);

    res.status(200).json({
      message: "Success",
      data: follow,
    });
  });
}

module.exports = FollowController;
