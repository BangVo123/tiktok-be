const mongoose = require("mongoose");

const digitCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email must be required"],
  },
  code: {
    type: String,
    required: [true, "Code must be required"],
  },
  type: {
    type: String,
    enum: ["auth", "reset"],
  },
  expired_at: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 1000),
  },
});

const DigitCode = mongoose.model("DigitCode", digitCodeSchema);

module.exports = DigitCode;
