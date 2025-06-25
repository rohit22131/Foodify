import React from "react";
import heroImage from "../../assets/hero.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-center justify-center lg:text-left space-y-6">
          <h1 className="text-2xl md:text-5xl font-extrabold text-gray-800">
            <span className="text-red-600">Crave.</span> Order. Enjoy.
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Satisfy your hunger with just a click. Fresh, fast, and delicious
            meals delivered right to your doorstep.
          </p>
          <Link to="/food">
            <button className="text-red-600 flex m-auto font-bold mt-6 px-6 py-3 border-2 rounded-sm hover:bg-red-600 hover:text-white transition duration-200 cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img src={heroImage} alt="Delicious food" className="max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
