const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  password: String,
  avatar: String,
  bio: String,
  google_id: String,
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
});

//write middleware of mongoose

const User = mongoose.model("User", userSchema);

module.exports = User;
