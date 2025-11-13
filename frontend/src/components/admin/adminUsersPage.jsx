import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params: { search, sortBy },
        }
      );
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        Manage Users
      </h2>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="nameAsc">Name A-Z</option>
          <option value="nameDesc">Name Z-A</option>
        </select>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No users found</div>
      )}

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition border border-gray-100"
          >
            <p className="text-lg font-semibold text-red-600 mb-2">
              {user.name}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
            <p className="text-sm text-gray-500">
              Status: {user.isSuspended ? "Suspended" : "Active"}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setSelectedUser(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

{/* User Detail Modal */}
{selectedUser && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-[400px] relative border border-gray-200">
      
      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl transition-transform transform hover:scale-125"
      >
        ×
      </button>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={
              selectedUser.profilePhoto
                ? `${import.meta.env.VITE_API_BASE_URL}${selectedUser.profilePhoto.replace(/\\/g, "/")}`
                : "https://www.gravatar.com/avatar/?d=mp"
            }
            alt={selectedUser.name}
            className="w-28 h-28 rounded-full border-4 border-orange-500 shadow-lg object-cover"
          />
          <span
            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
              selectedUser.isSuspended ? "bg-red-500" : "bg-green-500"
            }`}
          ></span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mt-3">
          {selectedUser.name}
        </h3>
        <span
          className={`px-3 py-1 mt-1 rounded-full text-sm font-semibold shadow-sm ${
            selectedUser.isSuspended
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {selectedUser.isSuspended ? "Suspended" : "Active"}
        </span>
      </div>

      {/* Details Section */}
      <div className="space-y-3 text-gray-800">
        <p>
          <strong>📧 Email:</strong>{" "}
          <a
            href={`mailto:${selectedUser.email}`}
            className="text-blue-600 hover:underline"
          >
            {selectedUser.email}
          </a>
        </p>
        <p>
          <strong>📱 Phone:</strong> {selectedUser.phone || "N/A"}
        </p>
        <p>
          <strong>🏠 Address:</strong> {selectedUser.address || "N/A"}
        </p>
        <p>
          <strong>🏷 Role:</strong> {selectedUser.role}
        </p>
        <p>
          <strong>📅 Joined:</strong>{" "}
          {new Date(selectedUser.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setSelectedUser(null)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-200"
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

export default AdminUsersPage;
