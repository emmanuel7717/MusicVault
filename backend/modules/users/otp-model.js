const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 5 minutes
    },
  },
  { versionKey: false }
);

const OTPModel = mongoose.model("OTP", otpSchema);

module.exports = OTPModel;
