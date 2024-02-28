const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Destructure mongoose to get Schema and model
const { Schema, model } = mongoose;

// Define User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 4,
  },
});

// Middleware to hash the password before saving to the database
UserSchema.pre("save", async function () {
  // Generate a salt and hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to create a JWT token for the user
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_LIFESPAN,
    }
  );
};

// Method to compare a given password with the hashed password in the database
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// Export the User model
module.exports = model("User", UserSchema);
