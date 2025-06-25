import React from "react";
import MidBanner from "../../assets/middlebanner.jpg";

const MiddleBanner = () => {
  return (
    <section className="relative w-full h-[400px] mt-20">
      <img
        src={MidBanner}
        alt="Delicious food"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col backdrop-brightness-50 justify-center items-center text-center px-4 lg:px-20">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Delicious Meals Delivered to Your Doorstep
        </h1>
        <p className="text-white text-lg md:text-2xl mb-6 drop-shadow-md">
          Explore our wide range of cuisines and order now to enjoy fresh and
          tasty dishes.
        </p>
        <button className="bg-red-500 text-white py-3 px-5 rounded-lg text-lg md:text-xl hover:bg-red-600 transition-all cursor-pointer">
          Order Now
        </button>
      </div>
    </section>
  );
};

export default MiddleBanner;
