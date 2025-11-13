import React, { useState } from "react";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSummaryPage = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40; // Example: Free delivery over ₹500
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const totalAmount = subtotal + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    const cleanedItems = cart.map(({ name, quantity, price, image }) => ({
      name,
      quantity,
      price,
      image,
    }));

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        { items: cleanedItems, totalAmount, address },
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
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Order Summary</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
          {/* 🧾 Order Items */}
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Items</h3>
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-right font-semibold text-green-600">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          {/* 📍 Delivery Address */}
          <h3 className="text-xl font-semibold mt-6 text-gray-800">Delivery Address</h3>
          <input
            type="text"
            placeholder="Enter Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* 🧮 Bill Breakdown */}
          <h3 className="text-xl font-semibold mt-6 text-gray-800">Bill Summary</h3>
          <div className="mt-2 space-y-1 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-2">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Action Buttons */}
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
