require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are manadatory",
      });
    }
    const duplicateUser = await userModel.findOne({ email });
    if (duplicateUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = (await bcrypt.hash(password, 8)).toString();
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "User created successfully",
      jwtToken: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "User logged in successfully",
      jwtToken: token,
    });
  } catch {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
};
