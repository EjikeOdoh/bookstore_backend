const User = require("../models/User");

const { newUserMailer } = require("../utils/mailer");

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

// Export the controller functions
module.exports = {
  register,
  login,
  updateUser,
};
