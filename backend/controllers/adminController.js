// adminController.js (Final Modified)

import User from "../models/User.js";
import Order from "../models/Order.js";
import Food from "../models/food.js";

// 1. Get All Users with Search, Filter, Sort
export const getAllUsers = async (req, res) => {
  try {
    const { search, role, sortBy } = req.query;

    const searchCondition = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const roleCondition = role ? { role } : {};

    let sort = { createdAt: -1 }; // Default: Newest
    if (sortBy === "oldest") sort = { createdAt: 1 };
    else if (sortBy === "nameAsc") sort = { name: 1 };
    else if (sortBy === "nameDesc") sort = { name: -1 };

    const users = await User.find({
      ...searchCondition,
      ...roleCondition,
    })
      .select("-password")
      .sort(sort);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 2. Toggle User Status (Suspend/Activate)
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.json({ message: `User ${user.isSuspended ? "suspended" : "activated"}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user status" });
  }
};

// 3. Change User Role (Promote/Demote)
export const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "user", "agent", "vendor"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role" });
  }
};

// 4. Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// 5. Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// 6. Delete Order
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// 7. Get All Foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods" });
  }
};

// 8. Delete Food
export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete food" });
  }
};

// 9. Toggle Food Availability
export const toggleFoodAvailability = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food item not found' });

    food.available = !food.available;
    await food.save();

    res.json({ available: food.available });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
