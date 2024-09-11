const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    nickname: {
      type: String,
      require: [true, "Please enter your nickname"],
      trim: true,
    },
    email: String,
    phone_nums: String,
    password: String,
    avatar: String,
    bio: String,
    account_id: String,
    provider: String,
    tick: {
      type: Boolean,
      default: false,
    },
    followings_count: {
      type: Number,
      default: 0,
    },
    followers_count: {
      type: Number,
      default: 0,
    },
    likes_count: {
      type: Number,
      default: 0,
    },
    website_URL: String,
    facebook_URL: String,
    youtube_URL: String,
    twitter_URL: String,
    instagram_URL: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//write middleware of mongoose

const User = mongoose.model("User", userSchema);

module.exports = User;
