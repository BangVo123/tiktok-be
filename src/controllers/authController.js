const passport = require("passport");
const asyncHandler = require("../helper/asyncHandler");
const AuthService = require("../services/auth");
const { signAToken, signFToken } = require("../utils/jwt");
const SuccessResponse = require("../helper/successResponse");

class AuthController {
  static login = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) next(err);

      const accessToken = signAToken({ id: user.id, email: user.email });

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return new SuccessResponse({
        message: "Login success",
        metadata: accessToken,
      }).send(res);
    })(req, res, next);
  };

  static signup = (req, res, next) => {
    passport.authenticate("local", {}, (err, user, info) => {
      if (err) next(err);

      const accessToken = signAToken({ id: user.id, email: user.email });

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return new SuccessResponse({
        message: "Login success",
      }).send(res);
    })(req, res, next);
  };

  static logout = (req, res, next) => {
    req.logout((err) => {
      if (err) next(err);

      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.clearCookie("jwt");

        res.status(200).json({
          message: "Logout success",
        });
      });
    });
  };

  static sendCode = asyncHandler(async (req, res, next) => {
    await AuthService.sendCode({ email: req.body.email, type: req.body.type });
    res.status(200).json({
      message: "Success",
    });
  });
}

module.exports = AuthController;
