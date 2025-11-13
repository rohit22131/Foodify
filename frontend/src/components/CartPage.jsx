import React from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Cart from "./cart page/Cart";

function CartPage() {
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <CartProvider>
      <Cart useCart={useCart} getTotalPrice={getTotalPrice} />
    </CartProvider>
  );
}

export default CartPage;
