const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    gender: { type: String, required: true},
    token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
