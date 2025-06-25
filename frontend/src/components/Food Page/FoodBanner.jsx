import React from "react";
import foodBanner from "../../assets/foodBanner.jpg";

const FoodBanner = () => {
  return (
    <section className="relative w-auto h-[400px] mx-10 my-20">
      <img
        src={foodBanner}
        alt="Delicious food"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col backdrop-brightness-50 justify-center items-center text-center px-4 lg:px-20">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Experience Culinary Excellence at Home
        </h1>
        <p className="text-white text-lg md:text-2xl mb-6 drop-shadow-md">
          Discover the perfect blend of flavors and enjoy a delightful dining
          experience delivered right to you.
        </p>
      </div>
    </section>
  );
};

export default FoodBanner;
