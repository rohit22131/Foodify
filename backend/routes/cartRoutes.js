import express from "express";
import cartController from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes now use user info from token (via protect middleware)
router.get("/", protect, cartController.getUserCart);
router.post("/", protect, cartController.addToCart);
router.delete("/:foodId", protect, cartController.removeFromCart);
router.delete("/", protect, cartController.clearCart);

export default router;
