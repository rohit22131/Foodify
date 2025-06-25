import express from "express";
import {
  getAllFoodItems,
  getFoodById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getSpecialFoods,
} from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/specials", getSpecialFoods);

// Get all food items
router.get("/", getAllFoodItems);
// Get food item by ID
router.get("/:id", getFoodById);

//(Admin only)
router.post("/", protect, createFoodItem);
router.put("/:id", protect, updateFoodItem);
router.delete("/:id", protect, deleteFoodItem);

export default router;
