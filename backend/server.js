const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/authMiddleware"); // ✅ Add this

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// ✅ Example of a protected route:
app.get("/api/secret", requireAuth, (req, res) => {
  res.json({ message: `You are logged in as ${req.user.email}` });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

app.get("/", (req, res) => {
  res.send("Vinted Clone API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use("/uploads", express.static("uploads"));

