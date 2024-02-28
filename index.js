const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//connect to db
const connectDB = require("./db/connectDB");
require("dotenv").config();

const auth = require("./routes/auth");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ status: "Successful", data: {} });
});

app.use("/api/v1/auth", auth);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  } finally {
    app.listen(PORT, () => {
      console.log(`Server up on port ${PORT}`);
    });
  }
};

start();
