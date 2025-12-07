const mongoose = require("mongoose");
const { encodePassword } = require("../../shared/password-utils");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = encodePassword(this.password);
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
