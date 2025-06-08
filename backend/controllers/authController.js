const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to create a JWT token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ username, email, password: hashed });
    await user.save();

    // Create JWT token
    const token = createToken(user);

    res.status(201).json({ message: "User created", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = createToken(user);

    res.status(200).json({ message: "Login success", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
