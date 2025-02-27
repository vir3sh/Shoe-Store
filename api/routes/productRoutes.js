import express from "express";
import {
  ProductAdd,
  ProductDelete,
  ProductView,
  ProductList,
} from "../controllers/productController.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", ProductAdd);
ProductRouter.delete("/delete/:id", ProductDelete);
ProductRouter.get("/view/:id", ProductView);
ProductRouter.get("/list", ProductList);

export default ProductRouter;
