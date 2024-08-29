const asyncHandler = require("../helper/asyncHandler");
const AppError = require("../utils/error");

const protect = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return next();
  } else {
    throw new AppError("User not authenticate", 401);
  }
});

module.exports = protect;
