const User = require("../models/User");
class AuthService {
  static findOrCreate = async (profile, provider) => {
    console.log("profile", profile);
    let user = await User.findOne({ account_id: profile.id });
    const name =
      provider === "facebook"
        ? `${profile.name.familyName} ${profile.name.givenName}`
        : profile.displayName;
    if (!user) {
      user = await User.create({
        full_name: name,
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
