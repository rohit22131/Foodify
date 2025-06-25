import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg p-2 sm:p-4 sticky top-0 z-30">
      <div className="container px-4 sm:px-12 py-2 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600"
        >
          Foodify
        </Link>

        {/* Navigation Links (Desktop) */}
        <ul className="lg:flex lg:space-x-12 text-gray-600 hidden flex-grow lg:justify-center">
          <Link to="/">
            <li className="hover:text-orange-700 font-bold cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/food">
            <li className="hover:text-orange-700 font-bold cursor-pointer">
              Menu
            </li>
          </Link>
          <Link to="/cart">
            <li className="hover:text-orange-700 font-bold cursor-pointer">
              Cart
            </li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-orange-700 font-bold cursor-pointer">
              Contact
            </li>
          </Link>
        </ul>

        {/* Right-side Buttons (Desktop) */}
        <div className="lg:flex lg:space-x-4 hidden items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-red-500"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/my-orders")}
                className="text-red-600 px-3 py-2 border-2 rounded-lg shadow hover:bg-red-600 hover:text-white"
              >
                My Orders
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-orange-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-orange-500">
                Login/SignUp
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <div className="lg:hidden flex items-center space-x-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-lg shadow hover:bg-red-500"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-orange-600 text-white px-3 py-2 rounded-lg shadow hover:bg-orange-500">
                Login/SignUp
              </button>
            </Link>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-orange-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hamburger Drawer (Slide-Down) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 px-6 py-6 bg-white shadow-md">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <p className="text-lg font-bold text-gray-800 hover:text-red-800">
              Home
            </p>
          </Link>
          <Link to="/food" onClick={() => setIsMenuOpen(false)}>
            <p className="text-lg font-bold text-gray-800 hover:text-red-800">
              Menu
            </p>
          </Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
            <p className="text-lg font-bold text-gray-800 hover:text-red-800">
              Cart
            </p>
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            <p className="text-lg font-bold text-gray-800 hover:text-red-800">
              Contact
            </p>
          </Link>

          {isLoggedIn && (
            <button
              onClick={() => {
                navigate("/my-orders");
                setIsMenuOpen(false);
              }}
              className="text-red-600 px-3 py-2 border-2 rounded-lg shadow hover:bg-red-600 hover:text-white"
            >
              My Orders
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
