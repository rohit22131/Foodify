import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

const AdminPromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromo, setNewPromo] = useState({
    title: "",
    code: "",
    discount: "",
    isActive: true,
  });

  // Dummy data for initial load
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "New User Offer",
        code: "WELCOME50",
        discount: "50% Off",
        isActive: true,
      },
      {
        id: 2,
        title: "Weekend Feast",
        code: "WEEKEND30",
        discount: "30% Off",
        isActive: false,
      },
    ];
    setPromotions(dummyData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPromotion = (e) => {
    e.preventDefault();
    const id = promotions.length + 1;
    setPromotions([...promotions, { ...newPromo, id }]);
    setNewPromo({ title: "", code: "", discount: "", isActive: true });
  };

  const togglePromoStatus = (id) => {
    const updated = promotions.map((p) =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    setPromotions(updated);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this promotion?")) return;
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="text-4xl font-bold text-orange-600 mb-8 text-center">
        Manage Promotions & Coupons
      </h2>

      {/* Add Promotion Form */}
      <div className="max-w-xl mx-auto mb-10 bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaPlus className="mr-2" /> Add Promotion
        </h3>
        <form onSubmit={handleAddPromotion} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPromo.title}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={newPromo.code}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="discount"
            placeholder="Discount (e.g., 20% Off)"
            value={newPromo.discount}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Add Promotion
          </button>
        </form>
      </div>

      {/* Promotions List */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Discount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border px-4 py-2 font-medium">{p.title}</td>
                <td className="border px-4 py-2 text-sm text-gray-700">{p.code}</td>
                <td className="border px-4 py-2 text-sm">{p.discount}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      p.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                    onClick={() => alert("Edit functionality coming soon")}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => togglePromoStatus(p.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Toggle Status"
                  >
                    {p.isActive ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPromotionsPage;