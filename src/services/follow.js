const Follower = require("../models/Follower");
const User = require("../models/User");

class FollowService {
  static getAllFollow = async ({ userId }) => {
    const follows = await Follower.distinct("following_id", {
      user_id: userId,
    });
    return follows;
  };

  static follow = async ({ userId, followingId }) => {
    const follower = await User.findById(userId);
    const following = await User.findById(followingId);
    console.log(`er ${follower} ing ${following}`);
    const foundFollow = await Follower.findOne({
      user_id: userId,
      following_id: followingId,
    });
    if (foundFollow) {
      await foundFollow.deleteOne();
      follower.followings_count = follower.followings_count - 1;
      following.followers_count = following.followers_count - 1;
      console.log(follower, following);
      await follower.save();
      await following.save();
      return {};
    } else {
      const newFollow = await Follower.create({
        user_id: userId,
        following_id: followingId,
      });
      follower.followings_count = follower.followings_count + 1;
      following.followers_count = following.followers_count + 1;
      console.log(follower, following);
      await follower.save();
      await following.save();
      return newFollow;
    }
  };
}

module.exports = FollowService;
