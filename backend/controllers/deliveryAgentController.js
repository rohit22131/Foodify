import DeliveryAgent from "../models/DeliveryAgent.js";

// GET all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await DeliveryAgent.find().sort({ createdAt: -1 });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching agents" });
  }
};

// POST create new agent
export const createAgent = async (req, res) => {
  const { name, email, phone, assignedArea } = req.body;

  if (!name || !email || !phone || !assignedArea) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await DeliveryAgent.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const agent = new DeliveryAgent({ name, email, phone, assignedArea });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: "Error creating agent" });
  }
};

// PUT update agent
export const updateAgent = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, assignedArea, status } = req.body;

  try {
    const agent = await DeliveryAgent.findById(id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.phone = phone || agent.phone;
    agent.assignedArea = assignedArea || agent.assignedArea;
    agent.status = status || agent.status;

    await agent.save();
    res.status(200).json(agent);
  } catch (err) {
    res.status(500).json({ message: "Error updating agent" });
  }
};

// DELETE agent
export const deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await DeliveryAgent
      .findByIdAndDelete(id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting agent" });
  } 
};
 
// PUT: Toggle status (Active <-> Inactive)
export const toggleAgentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Active", "Inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const agent = await DeliveryAgent.findById(id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    agent.status = status;
    await agent.save();
    res.status(200).json({ message: `Agent status updated to ${status}` });
  } catch (err) {
    console.error("Error toggling agent status:", err);
    res.status(500).json({ message: "Failed to update agent status" });
  }
};
