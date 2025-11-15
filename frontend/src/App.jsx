import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FoodPage from './components/FoodPage';
import Login from './components/auth page/Login';
import CartPage from './components/CartPage';
import Contact from './components/Contact';
import MyOrdersPage from './components/MyOrdersPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import ProtectedAdminRoute from './protectedAdminRoute';
import { CartProvider, useCart } from './components/context/CartContext';
import OrderSummaryPage from './components/OrderSummaryPage';
import PaymentPage from './components/PaymentPage';
import AdminDashboard from './components/admin/adminDashboard';
import AdminOrdersPage from './components/admin/adminOrderPage';
import AdminFoodPage from './components/admin/adminFoodPage';
import AdminUsersPage from './components/admin/adminUsersPage';
import ScrollToTop from './components/ScrollToTop';
import ForgetPassword from './components/auth page/ForgetPassword';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AdminAnalyticsPage from './components/admin/adminAnalyticsPage';
import AdminDeliveryAgents from './components/admin/adminDeliveryAgents';
import AdminPromotionsPage from './components/admin/adminPromotionsPage';
import VerifyEmail from './components/auth page/VerifyEmail';
import AddressPage from './components/AddressPage';


function App() {
  return (
    <div>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-summary" element={<OrderSummaryPage useCart={useCart} />} />
          <Route path="/payment" element={<PaymentPage useCart={useCart} />} />
          <Route path='/order-success' element={<OrderSuccessPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/manage-addresses" element={<AddressPage />} />


          {/* Admin Routes */}

          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/orders" element={<ProtectedAdminRoute><AdminOrdersPage /></ProtectedAdminRoute>} />
          <Route path="/admin/foods" element={<ProtectedAdminRoute><AdminFoodPage /></ProtectedAdminRoute>} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsersPage /></ProtectedAdminRoute>} />
          <Route path="/admin/reports" element={<ProtectedAdminRoute><AdminAnalyticsPage /></ProtectedAdminRoute>} />
          <Route path="/admin/delivery-agents" element={<ProtectedAdminRoute><AdminDeliveryAgents /></ProtectedAdminRoute>} />
          <Route path="/admin/promotions" element={<ProtectedAdminRoute><AdminPromotionsPage /></ProtectedAdminRoute>} />

        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;