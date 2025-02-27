import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // 🛠 Debugging: Check if userId and itemId are received correctly
    console.log("Received userId:", userId);
    console.log("Received itemId:", itemId);
    console.log("Received size:", size);

    // Validate required fields
    if (!userId || !itemId || !size) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Validate if userId and itemId are valid MongoDB ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId or itemId" });
    }

    // Check if product exists in database
    const product = await Product.findById(itemId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Fetch user data correctly
    const userData = await User.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists
    let cartData = userData.cartData || {};

    // Initialize item in cartData
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    // Increment quantity
    cartData[itemId][size] += 1;

    // Update the user's cartData
    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is always an object

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated", cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to update cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body; // Extract from URL parameters

    // console.log("Fetching cart for userId:", userId);

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    // Find user
    const userData = await User.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {}; // Ensure cartData is always an object

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart data" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.cartData || typeof user.cartData !== "object") {
      return res.status(400).json({ error: "Cart data not found" });
    }

    // console.log("Before Deletion:", user.cartData);

    // Check if the item exists in cartData
    if (user.cartData[itemId]) {
      // Remove the specific size
      delete user.cartData[itemId][size];

      // If no sizes remain, delete the item completely
      if (Object.keys(user.cartData[itemId]).length === 0) {
        delete user.cartData[itemId];
      }

      // 🔥 Mark cartData as modified
      user.markModified("cartData");

      // Save updated user data
      await user.save();

      // console.log("After Deletion:", user.cartData);
      return res
        .status(200)
        .json({ message: "Item removed from cart", cartData: user.cartData });
    } else {
      return res.status(400).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
