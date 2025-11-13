import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFilter } from "react-icons/fa";

const AdminFoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Veg",
    isSpecial: false,
  });
  const [editFood, setEditFood] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/foods`);
      setFoods(res.data);
      setFilteredFoods(res.data);
    } catch {
      alert("Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    if (editFood) {
      setNewFood({
        name: editFood.name,
        description: editFood.description,
        price: editFood.price,
        image: editFood.image,
        category: editFood.category,
        isSpecial: editFood.isSpecial || false,
      });
    }
  }, [editFood]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewFood((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !!checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "foodify_unsigned"); // your new unsigned preset


    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dr8gyjm6v/image/upload", formData);
      setNewFood((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch {
      alert("Image upload failed");
    }
  };

  const handleAddOrEditFood = async (e) => {
    e.preventDefault();
    setError("");

    if (!newFood.name || !newFood.price || !newFood.image || !newFood.description) {
      setError("All fields are required");
      return;
    }

    try {
      if (editFood) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/foods/${editFood._id}`,
          newFood,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/foods`, newFood, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      }

      fetchFoods();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save food item");
    }
  };

  const resetForm = () => {
    setEditFood(null);
    setNewFood({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "Veg",
      isSpecial: false,
    });
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/foods/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchFoods();
    } catch {
      alert("Failed to delete food item");
    }
  };

  const handleSearchAndFilter = () => {
    let filtered = [...foods];
    if (searchQuery.trim()) {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    if (filterCategory !== "All") {
      filtered = filtered.filter((food) => food.category === filterCategory);
    }
    setFilteredFoods(filtered);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filterCategory, foods]);

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        Manage Foods
      </h2>

      {/* Add/Edit Form */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow rounded-2xl p-8 mb-16">
        <h3 className="text-2xl font-bold text-red-600 mb-6">
          {editFood ? "Edit Food Item" : "Add New Food Item"}
        </h3>
        <form
          onSubmit={handleAddOrEditFood}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={newFood.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />
          <input
            name="price"
            type="number"
            value={newFood.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />
          <input
            name="image"
            value={newFood.image}
            onChange={handleInputChange}
            placeholder="Image URL (or use upload)"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 p-3 bg-gray-200 rounded-lg cursor-pointer"
          />
          <select
            name="category"
            value={newFood.category}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-lg"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
          <textarea
            name="description"
            value={newFood.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border border-gray-300 p-3 rounded-lg md:col-span-2"
            required
          />

          <select name="isSpecial" value={newFood.isSpecial ? "Special" : "Regular"} onChange={(e) => setNewFood({ ...newFood, isSpecial: e.target.value === "Special" })} className="border border-gray-300 p-3 rounded-lg md:col-span-2">
            <option value="Regular">Regular</option>
            <option value="Special">Special</option>
          </select>

          {error && <p className="text-red-500 mt-2 md:col-span-2">{error}</p>}
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 md:col-span-2 mt-4 font-semibold transition duration-200"
          >
            {editFood ? "Update Food" : "Add Food"}
          </button>
          {editFood && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 md:col-span-2 mt-2 font-semibold transition duration-200"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

            {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-16 max-w-5xl mx-auto">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search food by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border px-3 py-2 bg-gray-100 rounded-lg"
          >
            <option value="All">All</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
      </div>

      {/* Food List Section */}
      {loading ? (
        <p className="text-center text-gray-600">Loading food items...</p>
      ) : filteredFoods.length === 0 ? (
        <p className="text-center text-gray-600">No food items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredFoods.map((food) => (
            <div
              key={food._id}
              className="relative bg-white border border-gray-100 rounded-3xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {food.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{food.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold text-lg">₹{food.price}</span>
                  <span className="text-xs bg-orange-100 text-orange-600 font-medium px-2 py-1 rounded">
                    {food.category}
                  </span>
                </div>
              </div>

              {food.isSpecial && (
                <span className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full shadow-md">
                  ⭐ Special
                </span>
              )}

              <button
                onClick={() => setEditFood(food)}
                className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFood(food._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFoodPage;
