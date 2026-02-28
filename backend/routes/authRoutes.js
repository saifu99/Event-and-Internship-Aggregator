import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//REGISTER ROUTE PASSWORD HIDE 
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    //CHECK IF ALL FIELDS ARE PROVIDED 
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //CHECK PASSWORD MATCH 
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //CHECK IF USER ALREADY EXISTS 
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //ENCRYPT PASSWORD BEFORE SAVING
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE AND SAVE NEW USER
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log("User saved:", user);

    //GENERATE JWT TOKEN HERE
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    //HIDE PASSWORD IN RESPONSE 
    const { password: _pw, ...safeUser } = user._doc;

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//LOGIN ROUTE UPDATE JWT
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //FIND USER BY USERNAME 
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    //COMPARE PASSWORD 
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid credentials" });

    //CREATE JWT TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    //EXCLUDE PASSWORD FROM RESPONSE 
    const { password: pw, ...safeUser } = user._doc;

    //SUCCESSFUL LOGIN 
    res.json({ message: "Login successful", token, user: safeUser });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//PROTECTED ROUTE 
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

export default router;
