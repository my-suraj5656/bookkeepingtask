const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Register

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new User({ name, email, password: hashedpassword, role });
    await newuser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. You can register first" });
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
