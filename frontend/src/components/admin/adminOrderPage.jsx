import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchAgents();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setOrders(Array.isArray(res.data) ? res.data : []); 
      
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Failed to fetch orders");
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/delivery-agents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    const AllAgents = Array.isArray(res.data) ? res.data : [];

    const ActiveAgents = AllAgents.filter(agent => agent.status === "Active");
    setAgents(ActiveAgents);

    console.log("Agents response:", res.data); 
    console.log("Active Agents:", ActiveAgents);
    } catch (err) {
      console.error("Error fetching agents:", err);
      alert("Failed to fetch delivery agents");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/status`,
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

  const handleAgentAssignment = async (orderId, agentId, agent) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/assign-agent`,
        { agentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Assigning agent", agentId, "to order", orderId);

      fetchOrders();
    } catch (err) {
      console.error("Error assigning agent:", err);
      alert("Failed to assign agent");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        Manage Orders
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition-all border border-gray-100"
          >
            <p className="text-lg font-semibold text-red-600 mb-2">
              Order #{order._id.slice(-6).toUpperCase()}
            </p>

            <p className="text-gray-800 mb-1">
              <span className="font-medium">User:</span> {order.userId?.name || "N/A"}
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

            {/* Status Update */}
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="mt-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/*Delivery Agent*/}
            <p className="text-gray-800 mb-1 mt-4">
              <span className="font-medium">Delivery Agent:</span>{" "}
                <span className="inline-block px-2 py-1 text-sm rounded bg-gray-200 text-gray-800">{order.delvieryAgent? order.delvieryAgent.name : "Not Assigned"}
                </span>
            </p>

            {/* Agent Assignment */}
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Delviery Agent
                </label>
                <select
                  value={order.deliveryAgent ? order.deliveryAgent.name : ""}
                  onChange={(e) => handleAgentAssignment(order._id, e.target.value, e.target.selectedOptions[0].text)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name} 
                    </option>
                  ))}
                </select>
            </div>

            <button
              onClick={() => setSelectedOrder(order)}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

{/* Order Detail Modal */}
{selectedOrder && (
  <div className="fixed inset-0 flex justify-center items-center z-50 px-2 sm:px-4 
                  bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative overflow-hidden 
                    animate-fadeIn">

      {/* Close Button */}
      <button
        onClick={() => setSelectedOrder(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-2xl"
        aria-label="Close"
      >
        ×
      </button>

      {/* Modal Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl px-6 py-3 text-white">
        <h3 className="text-lg sm:text-xl font-bold">
          Order #{selectedOrder._id.slice(-6).toUpperCase()}
        </h3>
        <p className="text-xs sm:text-sm opacity-90">
          Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Modal Body */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Details */}
        <div className="border rounded-lg bg-gray-50 p-3 text-sm text-gray-800 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Customer Details</h4>
          <p><strong>Name:</strong> {selectedOrder.userId?.name}</p>
          <p><strong>Email:</strong> {selectedOrder.userId?.email}</p>
          <p><strong>Phone:</strong> {selectedOrder.userId?.phone || "N/A"}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>
        </div>

        {/* Order Information */}
        <div className="border rounded-lg bg-gray-50 p-3 text-sm text-gray-800 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Order Information</h4>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-0.5 text-xs rounded ${
                selectedOrder.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : selectedOrder.status === "In Progress"
                  ? "bg-blue-200 text-blue-800"
                  : selectedOrder.status === "Delivered"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {selectedOrder.status}
            </span>
          </p>
          <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            Total: ₹{selectedOrder.totalAmount}
          </p>
        </div>

        {/* Delivery Agent */}
        <div className="md:col-span-2 border rounded-lg bg-gray-50 p-3 text-sm text-gray-800 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Delivery Agent</h4>
          {selectedOrder.deliveryAgent ? (
            <>
              <p><strong>Name:</strong> {selectedOrder.deliveryAgent.name}</p>
              <p><strong>Email:</strong> {selectedOrder.deliveryAgent.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.deliveryAgent.phone}</p>
            </>
          ) : (
            <p className="text-gray-500">No agent assigned yet</p>
          )}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-200 flex justify-end">
        <button
          onClick={() => setSelectedOrder(null)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminOrdersPage;
