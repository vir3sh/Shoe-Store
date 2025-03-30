import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "order placed" },
  payment: { type: Boolean, required: true, default: false },
  paymentMethod: { type: String, required: true },
  date: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
