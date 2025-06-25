import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch food items from MongoDB via backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foods")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to fetch food items from server"));
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Filter products based on selected category
  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const limitedProducts = filtered.slice(0, 8);

  return (
    <div className="pt-10">
      <ul className="flex items-center space-x-12 justify-center bg-red-600 text-white text-lg p-4 rounded-lg mb-8">
        <li
          className="cursor-pointer"
          onClick={() => setSelectedCategory("All")}
        >
          All Food
        </li>
        <li
          className="cursor-pointer"
          onClick={() => setSelectedCategory("Veg")}
        >
          Veg
        </li>
        <li
          className="cursor-pointer"
          onClick={() => setSelectedCategory("Non-Veg")}
        >
          Non-Veg
        </li>
      </ul>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      <a href="/food">
        <button className="bg-orange-600 text-white flex m-auto font-bold my-10 px-6 py-2 rounded-sm hover:bg-orange-700 transition duration-200 cursor-pointer">
          More
        </button>
      </a>
    </div>
  );
};

export default ProductSection;
