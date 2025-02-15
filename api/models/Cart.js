import mongoose from "mongoose";

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
