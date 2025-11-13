import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const url = isLogin
      ? `${baseURL}/api/users/login`
      : `${baseURL}/api/users/register`;

    const payload = isLogin
      ? { email: email.trim(), password }
      : { name: name.trim(), email: email.trim(), password };

    if (!isLogin && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(url, payload);

      if (!isLogin) {
        toast.success("Account created! Check your email to verify.");
        resetForm();
        setIsLogin(true);
        return;
      }

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      setTimeout(() => {
        if (user?.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 700);

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Try again.";
      if (message.includes("verify your email")) {
        toast.error("Please verify your email. Check your inbox.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 m-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-xl">
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-extrabold text-orange-600">Foodify</h1>
        </div>

        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          {isLogin ? "Login to Your Account" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-800">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="mt-1 w-full border-2 rounded-lg px-4 py-2 shadow-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="mt-1 w-full border-2 rounded-lg px-4 py-2 shadow-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1 w-full border-2 rounded-lg px-4 py-2 shadow-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-[14px] text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {isLogin && (
              <div className="text-right text-sm mt-1">
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
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
