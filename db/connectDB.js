//import mongoose
const mongoose = require("mongoose");

//connect to database
const connectDB = (url) => {
  mongoose.connect(url);
};

//export to server
module.exports = connectDB;
