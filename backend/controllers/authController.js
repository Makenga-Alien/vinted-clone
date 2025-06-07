const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "User created", user });
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

    res.status(200).json({ message: "Login success", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
