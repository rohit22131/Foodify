import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
        <p className="text-lg">Thank you for your order!</p>
        <p className="text-md">
          Your order has been successfully placed. You will receive a
          confirmation email shortly.
        </p>
        <div className="mt-6">
          <button
            onClick={handleGoHome}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
