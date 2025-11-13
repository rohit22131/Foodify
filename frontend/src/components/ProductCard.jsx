import React, { useState } from "react";
import { useCart } from "./context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 max-w-sm hover:shadow-lg transition duration-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-45 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-green-600">
          ₹{product.price}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
          >
            -
          </button>
          <span className="text-lg font-bold">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
