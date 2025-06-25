import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        All Orders
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <p className="text-lg font-semibold text-red-600 mb-2">
              Order #{order._id.slice(-6).toUpperCase()}
            </p>

            <p className="text-gray-800 mb-1">
              <span className="font-medium">User:</span>{" "}
              {order.userId?.name || "N/A"}
            </p>

            <p className="text-gray-800 mb-1">
              <span className="font-medium">Total:</span> ₹{order.totalAmount}
            </p>

            <p className="text-gray-800 mb-1">
              <span className="font-medium">Address:</span> {order.address}
            </p>

            <p className="text-gray-800 mb-1">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 text-sm rounded ${
                  order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "In Progress"
                    ? "bg-blue-200 text-blue-800"
                    : order.status === "Delivered"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </p>

            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="mt-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
