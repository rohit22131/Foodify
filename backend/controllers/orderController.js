import Order from "../models/Order.js";

// Create Order
const placeOrder = async (req, res) => {
  const { items, totalAmount, address } = req.body;
  const userId = req.user._id;

  if (!items || !totalAmount || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get User Orders
const getMyOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };
