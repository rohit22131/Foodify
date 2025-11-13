import React from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaUtensils,
  FaUsers,
  FaStore,
  FaMotorcycle,
  FaChartBar,
  FaTags,
  FaCogs,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Manage Orders */}
        <Link to="/admin/orders">
          <div className="flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaClipboardList className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Manage Orders</span>
          </div>
        </Link>

        {/* Manage Foods */}
        <Link to="/admin/foods">
          <div className="flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 text-green-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUtensils className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Manage Foods</span>
          </div>
        </Link>

        {/* Manage Users */}
        <Link to="/admin/users">
          <div className="flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUsers className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Manage Users</span>
          </div>
        </Link>

        {/* Manage Delivery Agents */}
        <Link to="/admin/delivery-agents">
          <div className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaMotorcycle className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Delivery Agents</span>
          </div>
        </Link>

        {/* Analytics & Reports */}
        <Link to="/admin/reports">
          <div className="flex flex-col items-center justify-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaChartBar className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Analytics & Reports</span>
          </div>
        </Link>

        {/* Promotions/Discounts */}
        <Link to="/admin/promotions">
          <div className="flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaTags className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Promotions & Coupons</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
