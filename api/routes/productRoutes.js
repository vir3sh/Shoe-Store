import express from "express";
import {
  ProductAdd,
  ProductDelete,
  ProductView,
  ProductList,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", ProductAdd);
router.delete("/delete/:id", ProductDelete);
router.get("/view/:id", ProductView);
router.get("/list", ProductList);

export default router;
