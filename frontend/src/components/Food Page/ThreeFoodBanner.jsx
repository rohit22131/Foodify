import React from "react";
import pizza from "../../assets/pizza1.jpg";
import burger from "../../assets/Veggie Delight Burger.jpg";
import drinks from "../../assets/drinks.jpg";

const banners = [
  {
    id: 1,
    image: pizza,
    title: "Delicious Pizza",
    description: "Satisfy your cravings with our freshly baked pizzas!",
  },
  {
    id: 2,
    image: burger,
    title: "Burger Bonanza",
    description: "Juicy burgers with all the toppings you love!",
  },
  {
    id: 3,
    image: drinks,
    title: "Refreshing Drinks",
    description: "Cool off with our refreshing beverages and shakes.",
  },
];

const BannerCard = ({ banner }) => (
  <div className="relative overflow-hidden shadow-lg">
    <img
      src={banner.image}
      alt={banner.title}
      className="w-full h-55 object-cover md:h-65 lg:h-70"
    />
    <div className="absolute inset-0 backdrop-brightness-50 flex flex-col justify-center items-center text-center p-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {banner.title}
      </h2>
      <p className="text-lg text-gray-200 mt-2">{banner.description}</p>
    </div>
  </div>
);

const ThreeBanner = () => {
  return (
    <div className="pb-20 px-6">
      <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    </div>
  );
};

export default ThreeBanner;
