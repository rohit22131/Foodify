import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin
      ? `${process.env.REACT_APP_API_BASE_URL}/api/users/login`
      : `${process.env.REACT_APP_API_BASE_URL}/api/users/register`;

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(url, payload);

      if (!isLogin) {
        alert("Account created successfully. You can now log in.");
        setIsLogin(true);
        return;
      }

      const { token, user } = response.data;

      // Store token and full user info in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to /admin or / based on role
      navigate(user.isAdmin ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl transform">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600">Foodify</h1>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-red-600">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border-2 rounded-lg px-4 py-2 shadow-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border-2 rounded-lg px-4 py-2 shadow-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border-2 rounded-lg px-4 py-2 shadow-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <span className="text-blue-600">Terms of Service</span> and{" "}
          <span className="text-blue-600">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
