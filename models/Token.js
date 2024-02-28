const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});

TokenSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.token = await bcrypt.hash(this.token, salt);
});

TokenSchema.methods.compareToken = async function (refreshToken) {
  const isMatch = await bcrypt.compare(refreshToken, this.token);
  return isMatch;
};

module.exports = model("Token", TokenSchema);
