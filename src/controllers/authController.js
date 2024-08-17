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

  static logout = (req, res, next) => {
    req.logout((err) => {
      if (err) next(err);
    });
    res.clearCookie("connext.sid", { path: "/", domain: "localhost" }); //Delete cookie in client browser
    req.logout((err) => {
      if (err) return next(err);
      //remove session in express session
      req.session.destroy((err) => {
        if (err) return next(err);
        res.status(200).json({
          message: "Logout success",
        });
      });
    });
  };
}

module.exports = AuthController;
