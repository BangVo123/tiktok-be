const asyncHandler = require("../helper/asyncHandler");
const AppError = require("../utils/error");

const protect = asyncHandler(async (req, res, next) => {
  console.log("session: ", req.session);
  // console.log("cookies: ", req.cookies);
  if (req.isAuthenticated()) {
    next();
  } else {
    // res.status(401).json({ status: "Fail", message: "User not authenticate" });
    throw new AppError("User not authenticate", 401);
  }
});

module.exports = protect;
