import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("authToken");

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    navigate("/order-summary");
  };

  return (
    <div className="py-10 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-red-600">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-2xl font-medium text-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      className="w-24 h-24 object-cover rounded"
                      src={item.image}
                      alt={item.name}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
                    <span className="text-lg font-bold text-green-600">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() =>
                        removeFromCart(item.foodId?._id ?? item._id)
                      }
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 border-t pt-4 gap-4">
              <span className="text-lg font-bold w-full sm:w-auto text-center sm:text-left">
                Total Price:
              </span>
              <span className="text-lg font-bold text-green-600 w-full sm:w-auto text-center sm:text-right">
                ₹{getTotalPrice().toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={clearCart}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full sm:w-auto"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleProceedToCheckout}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full sm:w-auto"
                  >
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition w-full sm:w-auto"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
