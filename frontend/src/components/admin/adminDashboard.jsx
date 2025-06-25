import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaUtensils, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Link to="/admin/orders">
          <div className="flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaClipboardList className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Manage Orders</span>
          </div>
        </Link>

        <Link to="/admin/foods">
          <div className="flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 text-green-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUtensils className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Manage Foods</span>
          </div>
        </Link>

        <Link to="/admin/users">
          <div className="flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUsers className="text-5xl mb-4" />
            <span className="text-xl font-semibold">Manage Users</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
