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
    product_details: [
      {
        MARQUE: String,
        TAILLE: String,
        ÉTAT: String,
        COULEUR: String,
        EMPLACEMENT: String,
      },
    ],
    product_image: Object,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
