import express from "express";

const router = express.Router();

// Temporary test route
router.get("/test", (req, res) => {
  res.json({ message: "✅ User route working!" });
});

export default router;
