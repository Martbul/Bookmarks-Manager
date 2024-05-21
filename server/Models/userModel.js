const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: false, minlength: 5, maxlength: 1024 },
    googleId_jti: { type: String, unique: true, sparse: true },

    googleAuthAccessToken: { type: String, required: false },
    googleProfileData: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;