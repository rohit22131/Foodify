import Address from "../models/Address.js";

// Get all addresses for logged-in user
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const { label, street, city, state, pincode, phone } = req.body;

    const newAddress = new Address({
      userId: req.user.id,
      label,
      street,
      city,
      state,
      pincode,
      phone,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address || address.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.deleteOne();
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update address
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address || address.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Address not found" });
    }

    const { label, street, city, state, pincode, phone } = req.body;

    address.label = label || address.label;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.pincode = pincode || address.pincode;
    address.phone = phone || address.phone;

    const updated = await address.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};