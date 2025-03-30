import Order from "../models/Order.js";
import User from "../models/User.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, address, items, amount } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      date: Date.now(),
      paymentMethod: "COD",
      payment: false,
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findOneAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.json({ success: false, message: "Could not placed " });
  }
};

export const placeOrderStripe = async (req, res) => {};

export const placeOrderRazorpay = async (req, res) => {};

export const allOrders = async (req, res) => {};

export const userOrders = async (req, res) => {};

export const updateStatus = async (req, res) => {};
