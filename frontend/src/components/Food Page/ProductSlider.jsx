import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";

const ProductSlider = () => {
  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/foods/specials");
        setSpecialProducts(res.data);
      } catch (err) {
        console.error("Error fetching special products", err);
      }
    };

    fetchSpecialProducts();
  }, []);

  return (
    <div className="bg-gray-100 py-10 mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Special Products
      </h2>
      <div className="overflow-x-auto">
        <div className="flex py-8 gap-6 max-w-full mx-auto">
          {specialProducts.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-2/3 md:w-2/5 lg:w-1/4 h-100"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
