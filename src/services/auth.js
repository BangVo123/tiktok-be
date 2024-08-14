const User = require("../models/User");
class AuthService {
  static findOrCreate = async (profile) => {
    console.log(profile);
    let user = await User.findOne({ account_id: profile.id });
    if (!user) {
      user = await User.create({
        full_name: profile.displayName,
        email: profile.emails[0].value,
        account_id: profile.id,
        avatar: profile.photos[0].value,
        provider: profile.provider,
      });
    }

    return user;
  };
}

module.exports = AuthService;
