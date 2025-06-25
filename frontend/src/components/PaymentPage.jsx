import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment`,
        paymentInfo
      );
      if (response.data.success) {
        alert("Payment Successful!");
        navigate("/order-success");
      } else {
        alert("Payment Failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Payment(Dummy)
        </h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={paymentInfo.name}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-orange-400"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition duration-300"
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
