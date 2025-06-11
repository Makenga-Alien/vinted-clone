import express from "express";
import Offer from "../models/Offer.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const { title, description, price, details } = req.body;

    if (!title || !price) {
      return res.status(400).json({ error: "Missing title or price" });
    }

    const newOffer = new Offer({
      product_name: title,
      product_description: description,
      product_price: price,
      product_details: details,
      owner: req.user, // Comes from the auth middleware
    });

    await newOffer.save();

    res.status(201).json({
      _id: newOffer._id,
      title: newOffer.product_name,
      price: newOffer.product_price,
      owner: newOffer.owner.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
