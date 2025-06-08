const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  price:    { type: Number, required: true },
  image:    { type: String },
  brand:    { type: String },
  condition:{ type: String },
  size:     { type: String },
  color:    { type: String },
  owner:    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
