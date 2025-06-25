import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FoodPage from './components/FoodPage';
import Login from './components/Login';
import CartPage from './components/CartPage';
import Contact from './components/Contact';
import MyOrdersPage from './components/MyOrdersPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import ProtectedAdminRoute from './protectedAdminRoute';
import { CartProvider, useCart } from './components/cart page/context/CartContext';
import OrderSummaryPage from './components/OrderSummaryPage';
import PaymentPage from './components/PaymentPage';
import AdminDashboard from './components/admin/adminDashboard';
import AdminOrdersPage from './components/admin/adminOrderPage';
import AdminFoodPage from './components/admin/adminFoodPage';
import AdminUsersPage from './components/admin/adminUsersPage';


function App() {
  return (
    <div>
      <CartProvider> 
      <Routes> 
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/food" element={<FoodPage/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/cart" element={<CartPage/>} /> 
        <Route path="/contact" element={<Contact/>} /> 
        <Route path="/order-summary" element={<OrderSummaryPage useCart = {useCart}/>} /> 
        <Route path="/payment" element={<PaymentPage useCart = {useCart}/>} /> 
        <Route path='/order-success' element={<OrderSuccessPage/>} /> 
        <Route path="/my-orders" element={<MyOrdersPage/>} /> 

        <Route path="/admin" element={ 
          <ProtectedAdminRoute> 
          <AdminDashboard /> 
          </ProtectedAdminRoute>} /> 
        <Route path="/admin/orders" element={<AdminOrdersPage/>} /> 
        <Route path="/admin/foods" element={<AdminFoodPage/>} /> 
        <Route path="/admin/users" element={<AdminUsersPage/>} /> 
      </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
