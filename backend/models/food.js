import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Veg", "Non-Veg"],
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default Food;
