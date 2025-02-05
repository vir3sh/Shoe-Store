import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  sizes: {
    type: [Number],
    required: true,
  },
  images: {
    type: [Array],
    required: true,
  },
  category: {
    type: [String],
    required: true,
    trim: true,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
