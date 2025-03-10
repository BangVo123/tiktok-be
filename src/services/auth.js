const User = require("../models/User");
const { isEmail, isPhoneNumber } = require("../helper/authValidate");
const DigitCode = require("../models/DigitCode");
const sendMail = require("./mail");
const AppError = require("../utils/error");

class AuthService {
  static findOrCreate = async (profile, provider) => {
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

  static login = async ({ username, password, cb }) => {
    try {
      const foundUser = await User.findOne({
        $or: [{ email: username }, { phone_nums: username }],
        provider: null,
      }).select("+password");

      if (!foundUser) throw new AppError("User not found", 404);
      const comparePass = foundUser.comparePassword(password);
      if (!comparePass)
        return cb(new AppError("Email or password not correct", 404));

      return cb(null, foundUser);
    } catch (err) {
      cb(err);
    }
  };

  static signup = async ({ username, password, verifyCode, cb }) => {
    try {
      const getCode = await DigitCode.findOne({
        email: username,
        type: "auth",
      });
      if (verifyCode !== getCode.code)
        throw new AppError("Verification code is not valid", 400);

      if (getCode.expired_at < Date.now())
        throw new AppError("Verification code is expired. Try again", 400);

      await DigitCode.deleteOne({ email: username });

      const foundUser = await User.findOne({
        $or: [{ email: username }, { phone_nums: username }],
        provider: null,
      }).select("+password");

      if (foundUser) throw new AppError("User already exists");
      const newUser = await AuthService.createLocalUser({
        username,
        password,
      });
      return cb(null, newUser);
    } catch (err) {
      cb(err);
    }
  };

  static sendCode = async ({ email, type }) => {
    const foundUser = await User.findOne({ email });
    if (foundUser && type === "auth")
      throw new AppError("User already exist", 400);
    if (!foundUser && type === "reset")
      throw new AppError("User not found", 400);

    let code,
      isUnique = false;
    while (isUnique === false) {
      code = Math.floor(Math.random() * 900000);

      const foundCode = await DigitCode.findOne({ code });

      if (!code) isUnique = true;
    }

    //delete all code of this email
    await DigitCode.deleteMany({ email: email });

    await DigitCode.create({
      email: email,
      code: code,
      type: type,
    });

    const auth = {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    };

    const options = {
      from: process.env.EMAIL,
      to: email,
      subject:
        "This is your reset password code. It will expired after 5 minutes",
      text: `Your code is ${code}`,
    };
    await sendMail(auth, options);
  };

  static reset = async ({ password, verifyCode }) => {
    const foundUser = await User.findOne({
      $or: [{ email: username }, { phone_nums: username }],
      provider: null,
    }).select("+password");

    if (!foundUser) return done(new AppError("User not found", 404));

    const getCode = await DigitCode.findOne({
      email: username,
      type: "reset",
    });
    if (!getCode) throw new AppError("Verification code is not found", 404);
    if (getCode.expired_at < Date.now())
      throw new AppError("Verification code is expired");
    if (getCode.code !== code)
      throw new AppError("Verification code does not match", 400);

    foundUser.password = password;
    await foundUser.save();
  };
}

module.exports = AuthService;
