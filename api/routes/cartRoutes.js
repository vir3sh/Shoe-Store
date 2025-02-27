import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRoutes = express.Router();

cartRoutes.post("/add", addToCart);
cartRoutes.post("/update", authUser, updateCart);
cartRoutes.get("/user", authUser, getUserCart);

export default cartRoutes;
