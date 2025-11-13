import express from "express";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all + POST new
router.route("/")
  .get(protect, getAddresses)
  .post(protect, addAddress);

// UPDATE + DELETE by id
router.route("/:id")
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

export default router;
