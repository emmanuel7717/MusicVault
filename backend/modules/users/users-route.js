const express = require("express");
const router = express.Router();

const UserModel = require("./users-model");
const OTPModel = require("./otp-model");

const [registerRules, handleRegisterValidation] = require("./middlewares/register-rules");
const [loginRules, handleLoginValidation] = require("./middlewares/login-rules");
const [verifyLoginRules, handleVerifyLoginValidation] = require("./middlewares/verify-login-rules");

const { matchPassword } = require("../../shared/password-utils");
const { encodeToken } = require("../../shared/jwt-utils");
const { randomNumberOfNDigits } = require("../../shared/compute-utils");
const sendEmail = require("../../shared/email-utils");

// register
router.post("/register", registerRules, handleRegisterValidation, async (req, res) => {
  try {
    const newUser = req.body;

    const existing = await UserModel.findOne({ email: newUser.email });
    if (existing) {
      return res
        .status(400)
        .json({ message: `User with ${newUser.email} already exists` });
    }

    const created = await UserModel.create(newUser);
    const user = { ...created.toJSON(), password: undefined };
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not register user" });
  }
});

// login -> send OTP
router.post("/login", loginRules, handleLoginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: `User with ${email} does not exist` });
    }

    const ok = matchPassword(password, foundUser.password);
    if (!ok) {
      return res.status(401).json({ message: "Email and password did not match" });
    }

    const otp = randomNumberOfNDigits(6);

    await OTPModel.findOneAndUpdate(
      { account: foundUser._id },
      { otp },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const msg = `Your login OTP is ${otp}. It will expire in 5 minutes.`;
    await sendEmail(foundUser.email, "Your MusicVault login code", msg);
    console.log("yoooo, here is the otp: " , otp)

    res.json({ message: "OTP has been sent to your email address." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong while sending OTP." });
  }
});

// verify OTP -> return token
router.post(
  "/verify-login",
  verifyLoginRules,
  handleVerifyLoginValidation,
  async (req, res) => {
    try {
      const { email, otp } = req.body;

      const foundUser = await UserModel.findOne({ email });
      if (!foundUser) {
        return res
          .status(404)
          .json({ message: `User with ${email} does not exist` });
      }

      const otpDoc = await OTPModel.findOne({ account: foundUser._id });
      if (!otpDoc || String(otpDoc.otp) !== String(otp)) {
        return res.status(401).json({ message: "OTP verification failed" });
      }

      await OTPModel.deleteOne({ _id: otpDoc._id });

      const user = { ...foundUser.toJSON(), password: undefined };
      const token = encodeToken(user);

      res.json({ user, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong while verifying OTP." });
    }
  }
);

module.exports = router;
