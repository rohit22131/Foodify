import { useEffect, useState } from "react";
import axios from "axios";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    label: "Home",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const token = localStorage.getItem("token"); // JWT stored in localStorage

  // Fetch all addresses
  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Reset form
  const resetForm = () => {
    setForm({
      label: "Home",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
    setEditingId(null);
  };

  // Add / Update Address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing
        const { data } = await axios.put(
          `https://foodify-2-8t6w.onrender.com/api/addresses/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses(
          addresses.map((addr) => (addr._id === editingId ? data : addr))
        );
      } else {
        // Add new
        const { data } = await axios.post(
          "https://foodify-2-8t6w.onrender.com/api/addresses",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses([...addresses, data]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  // Delete address
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete address");
    }
  };

  // Start editing
  const handleEdit = (addr) => {
    setForm({
      label: addr.label,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      phone: addr.phone,
    });
    setEditingId(addr._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Addresses</h2>

      {/* Add/Edit Address Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-3"
      >
        <div>
          <label className="block text-sm font-medium">Label</label>
          <select
            name="label"
            value={form.label}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option>Home</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Address" : "Add Address"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Address List */}
      {loading ? (
        <p>Loading...</p>
      ) : addresses.length === 0 ? (
        <p>No addresses found. Add one above.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-gray-100 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{addr.label}</p>
                <p>
                  {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p>📞 {addr.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(addr)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
