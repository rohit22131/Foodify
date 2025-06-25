import React, { useState } from "react";
import { useCart } from "./cart page/context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSummaryPage = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const cleanedItems = cart.map(({ name, quantity, price, image }) => ({
      name,
      quantity,
      price,
      image,
    }));

    setLoading(true); // start loading

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          items: cleanedItems,
          totalAmount,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      clearCart();
      navigate("/payment");
    } catch (error) {
      alert("Failed to place order");
      console.error(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Order Summary
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-right font-semibold text-green-600">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-lg font-bold text-red-600">
              ₹{totalAmount}
            </span>
          </div>

          <input
            type="text"
            placeholder="Enter Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-6 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="mt-6 flex justify-between items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="w-1/2 bg-orange-600 text-white font-semibold py-3 rounded-md hover:bg-orange-700 transition duration-300"
            >
              ← Back to Cart
            </button>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-1/2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold py-3 rounded-md transition duration-300`}
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryPage;
