import express from "express";
import {
getAllUsers,
  getAllOrders,
  getAllFoods,
  deleteUser,
  deleteOrder,
  deleteFood,
  toggleFoodAvailability,
  toggleUserStatus,
  changeUserRole,
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

// Toggle food availability
router.put("/foods/:id/toggle-availability", protect, isAdmin, toggleFoodAvailability);

// Toggle user status
router.put("/users/:id/status", protect, isAdmin, toggleUserStatus);

// Change user role
router.put("/users/:id/role", protect, isAdmin, changeUserRole);

export default router;
