import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify JWT and attach user to request
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach full user (without password) to req.user
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token missing or malformed" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as admin" });
  }
};

export { protect, isAdmin };
