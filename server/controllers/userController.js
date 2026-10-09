import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

// ✅ Generate Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ SIGNUP
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Fill all required fields",
      });
    }

    // ✅ check existing user
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // ✅ create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // ✅ generate token
    const token = generateToken(user._id);

    // ❗ IMPORTANT FIX: remove password before sending
    user.password = undefined;

    // ✅ set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax", // 🔥 FIXED (Strict causes issues)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Signup successful",
      user,
      token
    });
  } catch (error) {
    console.log("Signup Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ LOGIN (🔥 FIXED COOKIE ISSUE)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all required fields",
      });
    }

    const existuser = await User.findOne({ email });

    if (!existuser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, existuser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = generateToken(existuser._id);

    // ❗🔥 IMPORTANT FIX: SET COOKIE (YOU MISSED THIS)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    existuser.password = undefined;

    return res.status(200).json({
      message: "Login successful",
      user: existuser,
      token
    });
  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

//  GET USER (FIXED ID)
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId; // 🔥 FIXED

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

//  GET USER RESUMES (FIXED)
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId; // 🔥 FIXED

    const resumes = await Resume.find({ userId });

    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};