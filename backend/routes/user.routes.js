import express from "express";
import uid2 from "uid2";
import SHA256 from "crypto-js/sha256.js";
import encBase64 from "crypto-js/enc-base64.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing field(s)" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Generate token & salt
    const salt = uid2(16);
    const token = uid2(32);
    const hash = SHA256(password + salt).toString(encBase64);

    // Create new user
    const newUser = new User({
      email,
      username,
      salt,
      hash,
      token,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      username: newUser.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // 1. Look up user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Re-hash the password with the stored salt
    const hash = SHA256(password + user.salt).toString(encBase64);

    // 3. Compare hashes
    if (hash !== user.hash) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 4. Return user info + token
    res.json({
      _id: user._id,
      token: user.token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
