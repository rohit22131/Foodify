import express from "express";
import {
  getAllUsers,
  getAllOrders,
  getAllFoods,
  deleteUser,
  deleteOrder,
  deleteFood,
} from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only routes
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/orders", protect, isAdmin, getAllOrders);
router.get("/foods", protect, isAdmin, getAllFoods);

// delete routes
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.delete("/orders/:id", protect, isAdmin, deleteOrder);
router.delete("/foods/:id", protect, isAdmin, deleteFood);

export default router;
