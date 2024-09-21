const asyncHandler = require("../helper/asyncHandler");
const AuthService = require("../services/auth");
const VideoService = require("../services/video");

class AuthController {
  static getUser = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const favorite = await VideoService.getFavorite({ userId: user.id });
    // console.log(favorite);

    res.status(200).json({
      status: "Success",
      data: {
        user,
        favorite,
      },
    });
  });

  static logout = (req, res, next) => {
    req.logout((err) => {
      if (err) next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.status(200).json({
          message: "Logout success",
        });
      });
    });
    res.clearCookie("connext.sid", { path: "/", domain: "localhost" }); //Delete cookie in client browser
    // res.redirect(process.env.CLIENT_URL);
  };
  static sendCode = asyncHandler(async (req, res, next) => {
    await AuthService.sendCode({ email: req.body.email, type: req.body.type });
    res.status(200).json({
      message: "Success",
    });
  });
}

module.exports = AuthController;
