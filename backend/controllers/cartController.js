import Cart from "../models/Cart.js";
import Food from "../models/food.js";

// Get User's Cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart) {
      return res.status(200).json({ userId, items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add or Update Item in Cart
const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { foodId, quantity } = req.body;

  try {
    if (!foodId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid food or quantity" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex((item) => {
      const existingId = item.foodId._id || item.foodId;
      return existingId.toString() === foodId;
    });

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const foodItem = await Food.findById(foodId);
      if (!foodItem) {
        return res.status(404).json({ message: "Food item not found" });
      }

      cart.items.push({
        foodId,
        name: foodItem.name,
        image: foodItem.image,
        price: foodItem.price,
        quantity,
      });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate("items.foodId");

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const foodId = req.params.foodId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.foodId.toString() !== foodId);

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ message: "Failed to remove from cart" });
  }
};

// Clear Entire Cart
const clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

export default {
  getUserCart,
  addToCart,
  removeFromCart,
  clearCart,
};
