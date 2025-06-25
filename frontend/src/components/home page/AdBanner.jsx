import React from "react";
import advPizza from "../../assets/adPizza.png";
import advCombo from "../../assets/adCombo.png";
import advNonVeg from "../../assets/AdNonVeg.png";

const AdvertisementBanner = () => {
  const sections = [
    {
      id: 1,
      title: "Special Pizza Offer",
      description:
        "Indulge in our delicious special pizzas with fresh toppings and cheesy goodness. Grab your favorite today!",
      imageUrl: advPizza,
      reverse: false,
    },
    {
      id: 2,
      title: "Meal Combos for You",
      description:
        "Enjoy hearty and wholesome meal combos designed to satisfy your cravings. Order now and relish the flavors!",
      imageUrl: advCombo,
      reverse: true,
    },
    {
      id: 3,
      title: "Non-Veg Feast",
      description:
        "Dive into our special non-veg dishes, crafted with premium quality ingredients for a delightful experience.",
      imageUrl: advNonVeg,
      reverse: false,
    },
  ];

  return (
    <div className="space-y-10 my-30">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`flex flex-col md:flex-row ${
            section.reverse ? "md:flex-row-reverse" : ""
          } items-center bg-gray-50 overflow-hidden`}
        >
          <div className="">
            <img
              src={section.imageUrl}
              alt={section.title}
              className="w-110 h-auto object-cover p-4 lg:p-10"
            />
          </div>
          <div className="px-6 md:px-10 lg:px-14 py-6 md:py-14 lg:py-30 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600 text-lg mb-4">{section.description}</p>
            <button className="px-4 py-2 bg-red-500 text-white text-lg rounded-lg shadow-md hover:bg-red-600 transition cursor-pointer">
              Explore Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvertisementBanner;
