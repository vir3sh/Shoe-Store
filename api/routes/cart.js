import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity, price } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex((item) =>
        item.productId.equals(productId)
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price });
      }

      cart.total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity, price }],
        total: price * quantity,
      });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !item.productId.equals(req.params.productId)
    );
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
