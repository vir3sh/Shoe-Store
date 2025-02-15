import Product from "../models/Product.js";
import upload from "../config/multerConfig.js";

// Add a new product
export const ProductAdd = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      const { name, description, sizes, category, bestseller, price } =
        req.body;
      const images = req.files.map((file) => file.path);

      try {
        const newProduct = new Product({
          name,
          description,
          sizes: JSON.parse(sizes), // Parse sizes as array
          images,
          category: JSON.parse(category), // Parse category as array
          bestseller,
          price,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
};
// Delete a product
export const ProductDelete = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View a single product
export const ProductView = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product  not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View a list of all products
export const ProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
