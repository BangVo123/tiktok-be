const User = require("../models/User");

class UserService {
  static getUserInfo = async ({ userId }) => {
    const foundUser = await User.findById(userId);
    return foundUser;
  };
}

module.exports = UserService;
