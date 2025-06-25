import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/my`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
       );
        setOrders(response.data);
      } catch (error) {
        alert("Failed to load orders");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-12 text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Order #{order._id.slice(-6).toUpperCase()}
              </h3>

              <div className="space-y-1 text-sm text-gray-800">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-orange-500 font-semibold">
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Total:</span> ₹
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {order.address}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  Items:
                </h4>
                <ul className="pl-4 list-disc text-sm text-gray-600 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} (₹
                      {item.price * item.quantity})
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-400 mt-5">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;