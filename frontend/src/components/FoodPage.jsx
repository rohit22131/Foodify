import React from 'react'
import ImageSlider from './Food Page/ImageSlider';
import SearchSection from './Food Page/SearchFood';
import ProductSlider from './Food Page/ProductSlider';
import { CartProvider } from './cart page/context/CartContext';
import FoodBanner from './Food Page/FoodBanner';
import ThreeBanner from './Food Page/ThreeFoodBanner';

function FoodPage() {
  return (
    <div>
      <CartProvider>
            <ImageSlider/>
            <SearchSection/>
            <ProductSlider/>
            <FoodBanner/>
            <ThreeBanner/>
      </CartProvider>
    </div>
  )
}

export default FoodPage;