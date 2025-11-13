// routes/userRoutes.js
import express from "express";
import {
  editUserProfile,
  getProfile,
  loginUser,
  registerUser,
  uploadProfilePhoto,
  verifyEmail
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadPhotoMiddleware } from "../middleware/uploadPhotoMiddleware.js";

const router = express.Router();

// Auth & Registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);

// Profile
router.get("/profile", protect, getProfile);
router.post("/upload-photo", protect, uploadPhotoMiddleware, uploadProfilePhoto);
router.post("/edit-profile", protect, editUserProfile);

export default router;
