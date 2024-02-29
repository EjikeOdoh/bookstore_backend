// Import the express framework
const express = require("express");

// Import the authentication controllers
const { register, login, updateUser } = require("../controllers/auth");

// Create an instance of the express Router
const router = express.Router();

// Define routes for various authentication-related operations

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route for updating user profile
router.patch("/update/:id", updateUser);

// Export the router for use in other parts of the application
module.exports = router;
