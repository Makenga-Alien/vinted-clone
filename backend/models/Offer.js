import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: String,
    product_price: {
      type: Number,
      required: true,
    },
  
    product_details: [Object], // E.g. [{brand: "Nike"}, {size: "M"}]
    product_image: Object, // Will be used with Cloudinary later

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
