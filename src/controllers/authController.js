const asyncHandler = require("../helper/asyncHandler");

class AuthController {
  static handleGoogleCB = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({ status: "Fail", message: "User not authenticate" });
    }
  };

  static getUser = asyncHandler(async (req, res, next) => {
    const user = req.user;
    console.log("user: ", req.user);

    res.status(200).json({
      status: "Success",
      data: user,
    });
  });
}

module.exports = AuthController;
