const Follower = require("../models/Follower");
const User = require("../models/User");

class UserService {
  static getUserInfo = async ({ userId }) => {
    const foundUser = await User.findById(userId);
    return foundUser;
  };

  static getAccountRelation = async ({ userId }) => {
    const followers = await Follower.find({ following_id: userId })
      .select("-following_id")
      .populate("user_id");
    const following = await Follower.find({ user_id: userId })
      .select("-user_id")
      .populate("following_id");

    const friends = followers.map((el) => {
      if (following.find((element) => element._id === el._id)) return el;
    });

    return {
      followers,
      following,
      friends,
    };
  };

  static updateCurrentUser = async ({ userId, payload }) => {
    return await User.findByIdAndUpdate(userId, payload, { new: true });
  };
}

module.exports = UserService;
