import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaTimes,
  FaUsers,
  FaSpinner,
} from "react-icons/fa";

const AdminDeliveryAgents = () => {
  const initialAgent = { name: "", email: "", phone: "", assignedArea: "" };

  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAgent, setNewAgent] = useState(initialAgent);
  const [editingAgentId, setEditingAgentId] = useState(null); // <-- added

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [searchQuery, statusFilter, agents]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/admin/delivery-agents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setAgents(res.data);
      setFilteredAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
      alert("Failed to fetch delivery agents");
    } finally {
      setLoading(false);
    }
  };

  const filterAgents = () => {
    let filtered = [...agents];
    if (searchQuery.trim()) {
      filtered = filtered.filter((agent) =>
        agent.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((agent) => agent.status === statusFilter);
    }
    setFilteredAgents(filtered);
  };

  const toggleStatus = async (agentId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(
        `${API_BASE}/api/admin/delivery-agents/${agentId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      fetchAgents();
    } catch (err) {
      console.error("Error toggling status:", err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (agentId) => {
    if (!window.confirm("Are you sure you want to delete this delivery agent?")) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/delivery-agents/${agentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchAgents();
    } catch (err) {
      console.error("Error deleting agent:", err);
      alert("Failed to delete delivery agent");
    }
  };

  // Unified add / update handler
  const handleSubmitAgent = async (e) => {
    e.preventDefault();
    const { name, email, phone, assignedArea } = newAgent;
    if (!name || !email || !phone || !assignedArea) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editingAgentId) {
        // Update existing agent
        await axios.put(
          `${API_BASE}/api/admin/delivery-agents/${editingAgentId}`,
          newAgent,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        alert("Agent updated successfully!");
      } else {
        // Create new agent
        await axios.post(`${API_BASE}/api/admin/delivery-agents`, newAgent, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        alert("Agent added successfully!");
      }

      // reset form & state
      setShowAddForm(false);
      setEditingAgentId(null);
      setNewAgent(initialAgent);
      fetchAgents();
    } catch (err) {
      console.error("Error saving agent:", err);
      // if backend responds with meaningful message, show it
      const msg = err?.response?.data?.message || "Failed to save agent. Email might already be in use.";
      alert(msg);
    }
  };

  const handleEditAgent = (agent) => {
    setNewAgent({
      name: agent.name || "",
      email: agent.email || "",
      phone: agent.phone || "",
      assignedArea: agent.assignedArea || "",
    });
    setEditingAgentId(agent._id); // <-- set id so submit will update
    setShowAddForm(true);
    // optionally scroll into view: document.getElementById("agent-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingAgentId(null);
    setNewAgent(initialAgent);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">
        Manage Delivery Agents
      </h2>

      {/* Search & Filter */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center border rounded-full px-4 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingAgentId(null);
              setNewAgent(initialAgent);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg shadow-md"
          >
            <FaPlus /> Add Agent
          </button>
        </div>
      </div>

      {/* Add/Edit Agent Form */}
      {showAddForm && (
        <form
          id="agent-form"
          onSubmit={handleSubmitAgent}
          className="bg-white p-6 rounded-xl shadow mb-8 space-y-4 animate-fadeIn"
        >
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-xl font-semibold text-gray-700">
              {editingAgentId ? "Edit Agent" : "New Agent"} Details
            </h3>
            <button
              type="button"
              onClick={handleCancelForm}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              <FaTimes />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              className="border px-3 py-2 rounded-lg w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
              className="border px-3 py-2 rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAgent.phone}
              onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
              className="border px-3 py-2 rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Assigned Area"
              value={newAgent.assignedArea}
              onChange={(e) => setNewAgent({ ...newAgent, assignedArea: e.target.value })}
              className="border px-3 py-2 rounded-lg w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg w-full"
          >
            {editingAgentId ? "Update Agent" : "Save Agent"}
          </button>
        </form>
      )}

      {/* Agents Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <FaSpinner className="animate-spin text-3xl mb-2" />
          Loading agents...
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <FaUsers className="text-3xl mb-2" />
          No delivery agents found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((a) => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-gray-800">{a.name}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    a.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {a.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">📧 {a.email}</p>
              <p className="text-sm text-gray-600 mb-2">📱 {a.phone}</p>
              <p className="text-sm text-gray-600">📍 {a.assignedArea}</p>
              <div className="flex justify-end gap-3 mt-4 text-lg">
                <button
                  onClick={() => handleEditAgent(a)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => toggleStatus(a._id, a.status)}
                  className="text-orange-500 hover:text-orange-700"
                >
                  {a.status === "Active" ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDeliveryAgents;
