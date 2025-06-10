import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token" });
    }

    const token = bearerToken.replace("Bearer ", "");

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach user to request so routes can use it
    req.user = user;

    next(); // move to next route handler
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default auth;
