const User = require("../models/User");
const { isEmail, isPhoneNumber } = require("../helper/authValidate");
const DigitCode = require("../models/DigitCode");
const sendMail = require("./mail");
const AppError = require("../utils/error");

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

  static createLocalUser = async ({ username, password }) => {
    const newUser = await User.create({
      full_name: `user-${Date.now().toString(36)}`,
      email: isEmail(username) ? username : null,
      phone_nums: isPhoneNumber(username) ? username : null,
      password,
    });

    return newUser;
  };

  static sendCode = async ({ email, type }) => {
    const foundUser = await User.findOne({ email });
    if (foundUser && type === "auth")
      throw new AppError("User already exist", 400);
    if (!foundUser && type === "reset")
      throw new AppError("User not found", 400);

    let code = "";
    for (let i = 0; i < 6; i++) {
      const rand = Math.floor(Math.random() * 10);
      code = code + rand;
    }

    await DigitCode.create({
      email: email,
      code: code,
      type: type,
    });

    //delete all code of this email
    await DigitCode.deleteMany({ email: email   });

    const auth = {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    };
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject:
        "This is your reset password code. It will expired after 10 minutes",
      text: `Your code is ${code}`,
    };
    await sendMail(auth, options);
  };
}

module.exports = AuthService;
