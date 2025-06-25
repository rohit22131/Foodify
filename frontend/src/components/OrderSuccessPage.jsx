import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200 max-w-lg text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for ordering with{" "}
          <span className="text-orange-600 font-semibold">Foodify</span>. Your
          delicious food is on the way!
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
