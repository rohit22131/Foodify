import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import slider4 from "../../assets/slider4.jpg";

const slides = [
  {
    id: 1,
    image: slider1,
    title: "Perfectly Crafted Flavors",
    description:
      "Experience the art of perfect flavors, crafted with care and attention to detail.",
  },
  {
    id: 2,
    image: slider2,
    title: "Unforgettable Taste",
    description:
      "Indulge in a taste that lingers and leaves you coming back for more.",
  },
  {
    id: 3,
    image: slider3,
    title: "The Ultimate Refreshment",
    description:
      "Refresh yourself with a selection that complements any occasion.",
  },
  {
    id: 4,
    image: slider4,
    title: "Comfort in Every Bite",
    description:
      "Enjoy the comfort of well-balanced meals that nourish and satisfy.",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[450px] overflow-hidden shadow-lg mt-4">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentIndex && (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0  backdrop-brightness-50 flex flex-col justify-center items-center text-center text-white p-4">
                  <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-lg">{slide.description}</p>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
