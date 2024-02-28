const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");

const {
  newUserMailer,
  resetPasswordRequestMailer,
} = require("../utils/mailer");
const crypto = require("crypto");

// Controller function to handle user registration
const register = async (req, res) => {
  try {
    // Create a new user using the provided request body
    const user = await User.create({ ...req.body });

    // Send a welcome email to the registered user
    await newUserMailer(user.email, user.firstName);

    // Respond with success status
    return res.json({ status: "Success" });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with an error status
    return res.json({ status: "Error" });
  }
};

// Controller function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.send("Please provide email and password");
  }

  // Search for the user with the provided email
  const user = await User.findOne({ email });

  // If user not found, respond with an error
  if (!user) {
    res.clearCookie("token", { maxAge: 600000, httpOnly: true });
    return res.json({ status: "Error", message: "User not found" });
  }

  // Check if the provided password is correct
  const isPasswordCorrect = await user.comparePassword(password);

  // If password is not correct, respond with an error
  if (!isPasswordCorrect) {
    res.clearCookie("token", { maxAge: 600000, httpOnly: true });
    return res.json({ status: "Error", message: "Password is not correct!" });
  }

  // If correct, create a new token and send user details
  const token = user.createToken();
  res.cookie("token", token, { maxAge: 600000, httpOnly: true });
  return res.json({
    status: "Success",
    userId: user?._id,
    email,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
};

// Controller function to handle user profile update
const updateUser = async (req, res) => {
  const { id: userId } = req.params;

  try {
    // Find and update the user based on the provided user ID
    const query = { _id: userId };
    const user = await User.findOneAndUpdate(query, req.body, { new: true });

    // If user not found, respond with an error
    if (!user) {
      return res.json({ status: "Error", message: "User not found" });
    }

    // Respond with success status and updated user data
    return res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with an error status
    return res.json({ status: "Error", message: "Server Error" });
  }
};

// Controller function to handle user password reset request
const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If user not found, respond with an error
    if (!user) {
      return res.json({ status: "Error", msg: "Email not found!" });
    }

    // Delete any existing reset tokens for the user
    let token = await Token.findOne({});
    if (token) {
      await token.deleteOne();
    }

    // Generate a new reset token and save it to the database
    let resetToken = crypto.randomBytes(32).toString("hex");
    await Token.create({
      userId: user._id,
      token: resetToken,
    });

    // Construct the reset password URL
    const url = `https://mbtronics-web.vercel.app?token=${resetToken}&id=${user._id}`;

    // Send a reset password request email to the user
    resetPasswordRequestMailer(user.email, user.firstName, url);

    // Respond with success status
    return res.json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with an error status
    return res.json({ status: "Error", message: "Server Error" });
  }
};

// Controller function to handle user password reset
const resetPassword = async (req, res) => {
  const { token, id } = req.query;
  const { password } = req.body;

  try {
    // Find the reset token for the user
    const resetToken = await Token.findOne({ userId: id });

    // If reset token not found, respond with an error
    if (!resetToken) {
      return res.json({ status: "Error", message: "User not found" });
    }

    // Check if the provided token is authentic
    const isTokenAuthentic = resetToken.compareToken(token);

    // If token is not authentic, respond with an error
    if (!isTokenAuthentic) {
      return res.json({ status: "Error", message: "Token expired!" });
    }

    // Hash the new password and update the user's password
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    // Find and update the user's password
    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: newPassword },
      { new: true }
    );

    // Respond with success status
    return res.json({ status: "Success" });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with an error status
    return res.json({ status: "Error", message: "Server Error" });
  }
};

// Export the controller functions
module.exports = {
  register,
  login,
  updateUser,
  resetPasswordRequest,
  resetPassword,
};
