import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// USER ROUTES
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// ADMIN ROUTES
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;
