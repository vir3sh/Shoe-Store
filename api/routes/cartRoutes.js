import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
  deleteCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRoutes = express.Router();

cartRoutes.post("/add", addToCart);
cartRoutes.post("/update", updateCart);
cartRoutes.get("/user", getUserCart);
cartRoutes.delete("/delete", deleteCart);

export default cartRoutes;
