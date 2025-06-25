import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../cart page/context/CartContext";

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  // Fetch only non-special products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/foods`);

        // Only include non-special products
        const nonSpecials = res.data.filter((product) => !product.isSpecial);

        setProducts(nonSpecials);
        setFilteredProducts(nonSpecials);

        // Initialize quantity for each product
        const initialQuantities = {};
        nonSpecials.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Failed to fetch food items", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(results);
  };

  // Quantity change
  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;

    addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    });
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for food..."
            className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        {/* Display Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-green-600">
                    ₹{product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(product._id)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">
                      {quantities[product._id]}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product._id)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No products found for "{query}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
