import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("authToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  const getLinkClass = (path) =>
    `text-sm font-medium uppercase tracking-wide transition duration-200 ${
      location.pathname === path
        ? "text-orange-600 underline underline-offset-4"
        : "text-gray-800 hover:text-orange-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-orange-600 tracking-tight">
          Foodify
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-12 items-center justify-center flex-1">
          <li><Link to="/" className={getLinkClass("/")}>Home</Link></li>
          <li><Link to="/food" className={getLinkClass("/food")}>Menu</Link></li>
          <li><Link to="/cart" className={getLinkClass("/cart")}>Cart</Link></li>
          <li><Link to="/contact" className={getLinkClass("/contact")}>Contact</Link></li>
        </ul>

        {/* Right-side Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-500 transition"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/my-orders")}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition ${
                  location.pathname === "/my-orders"
                    ? "bg-red-600 text-white border-red-600"
                    : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                }`}
              >
                My Orders
              </button>
              <button
                onClick={() => navigate("/profile")}
                className={`px-3 py-2 rounded-full border-2 flex items-center gap-2 text-sm font-medium transition ${
                  location.pathname === "/profile"
                    ? "bg-orange-600 text-white border-orange-600"
                    : "text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                }`}
              >
                <FaUserCircle size={18} />
                Profile
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-500 transition">
                Login / SignUp
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
        </button>
      </div>

{/* Mobile Drawer */}
<div
  className={`lg:hidden bg-white shadow-xl px-6 py-6 space-y-6 rounded-b-2xl absolute top-20 left-0 right-0 z-50 transform transition-all duration-300 ease-in-out ${
    isMenuOpen
      ? "opacity-100 scale-y-100"
      : "opacity-0 scale-y-0 pointer-events-none"
  } origin-top`}
>
  <div className="space-y-4 text-center">
    {[
      { path: "/", label: "Home" },
      { path: "/food", label: "Menu" },
      { path: "/cart", label: "Cart" },
      { path: "/contact", label: "Contact" },
    ].map((item) => (
      <Link to={item.path} key={item.path} onClick={() => setIsMenuOpen(false)}>
        <p
          className={`text-lg font-semibold transition-colors duration-200 ${
            location.pathname === item.path
              ? "text-orange-600"
              : "text-gray-800 hover:text-orange-600"
          }`}
        >
          {item.label}
        </p>
      </Link>
    ))}
  </div>

  <div className="border-t pt-6 flex flex-col items-center gap-3">
    {isLoggedIn ? (
      <>
        <button
          onClick={() => {
            navigate("/my-orders");
            setIsMenuOpen(false);
          }}
          className={`w-40 text-center px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
            location.pathname === "/my-orders"
              ? "bg-red-600 text-white border-red-600"
              : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          }`}
        >
          My Orders
        </button>
        <button
          onClick={() => {
            navigate("/profile");
            setIsMenuOpen(false);
          }}
          className={`w-40 text-center px-4 py-2 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
            location.pathname === "/profile"
              ? "bg-orange-600 text-white border-orange-600"
              : "text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
          }`}
        >
          <FaUserCircle className="text-lg" />
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-40 text-center px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-500 transition-all duration-200"
        >
          Logout
        </button>
      </>
    ) : (
      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
        <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-500 transition-all duration-200">
          Login / Sign Up
        </button>
      </Link>
    )}
  </div>
</div>


    </nav>
  );
}

export default Header;
