const asyncHandler = require("../helper/asyncHandler");
const UserService = require("../services/user");
const FollowService = require("../services/follow");
const VideoService = require("../services/video");

class UserController {
  static getUserInfo = asyncHandler(async (req, res, next) => {
    const foundUser = await UserService.getUserInfo({
      userId: req.params.userId,
    });

    res.status(200).json({
      status: "Success",
      data: foundUser,
    });
  });

  static getCurUserInfo = asyncHandler(async (req, res, next) => {
    const curUser = req.user;
    const favorite = await VideoService.getFavorite({ userId: curUser.id });
    const follow = await FollowService.getAllFollow({ userId: curUser.id });
    const accRelations = await UserService.getAccountRelation({
      userId: curUser.id,
    });

    res.status(200).json({
      status: "Success",
      data: {
        user: curUser,
        favorite,
        follow,
        accRelations,
      },
    });
  });

  static updateCurrentUser = asyncHandler(async (req, res, next) => {
    const result = await UserService.updateCurrentUser({
      userId: req.user.id,
      payload: req.body,
    });

    res.status(200).json({
      status: "Success",
      data: result,
    });
  });

  static getAccountRelations = asyncHandler(async (req, res, next) => {
    const resData = await UserService.getAccountRelation({
      userId: req.user.id,
    });

    res.status(200).json({
      status: "Success",
      data: resData,
    });
  });
}

module.exports = UserController;
