import Food from "../models/food.js";

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find({});
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get food item by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new food item
const createFoodItem = async (req, res) => {
  const { name, description, price, image, category, isSpecial } = req.body;
  try {
    const newFoodItem = new Food({
      name,
      description,
      price,
      image,
      category: category || "Veg",
      isSpecial: isSpecial || false,
    });

    const savedFoodItem = await newFoodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a food item
const updateFoodItem = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.image = image || food.image;
    food.category = category || food.category;

    const updatedFoodItem = await food.save();
    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a food item
const deleteFoodItem = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await food.deleteOne();
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all special products
const getSpecialFoods = async (req, res) => {
  try {
    const specials = await Food.find({ isSpecial: true });
    res.status(200).json(specials);
  } catch (error) {
    console.error("getSpecialFoods error:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllFoodItems,
  getFoodById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getSpecialFoods,
};
