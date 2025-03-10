const User = require("../models/User");
const AppError = require("../utils/error");
const { verifyAToken } = require("../utils/jwt");

const protect = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const token = req.cookies["jwt"];

    console.log(req.cookies);
    if (!token) next(new AppError("User not authenticate", 401));

    const payload = verifyAToken(token);

    const foundUser = await User.findById(payload?.id);
    if (!foundUser) next(new AppError("User not authenticate", 401));
    req.user = foundUser;

    next();
  }
};

module.exports = protect;
