const asyncHandler = require("../helper/asyncHandler");
const AppError = require("../utils/error");

const protect = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    throw new AppError("User not authenticate", 401);
  }
};

module.exports = protect;
