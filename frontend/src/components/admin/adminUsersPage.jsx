import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  // Delete user by ID
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        All Users
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
          >
            <p className="text-lg font-semibold text-red-600 mb-2">
              {user.name}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm text-gray-500">
              Role: {user.isAdmin ? "Admin" : "User"}
            </p>

            <button
              onClick={() => handleDelete(user._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
