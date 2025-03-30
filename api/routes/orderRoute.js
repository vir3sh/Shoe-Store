import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/list", allOrders);
orderRouter.post("/status", updateStatus);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
