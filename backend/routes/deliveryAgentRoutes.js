import express from "express";
import {
  getAgents,
  createAgent,
  updateAgent,
  deleteAgent,
  toggleAgentStatus,
} from "../controllers/deliveryAgentController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.get("/", protect, isAdmin, getAgents);               
router.post("/", protect, isAdmin, createAgent);          
router.put("/:id", protect, isAdmin, updateAgent);      
router.delete("/:id", protect, isAdmin, deleteAgent);   

// New route: toggle status
router.put("/:id/status", protect, isAdmin, toggleAgentStatus); 

export default router;
