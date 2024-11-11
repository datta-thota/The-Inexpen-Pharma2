import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import PublicLogin from './components/auth/PublicLogin';
import VendorLogin from './components/auth/VendorLogin';
import VendorDashboard from './components/dashboard/vendor/VendorDashboard';
import PublicDashboard from './components/dashboard/public/PublicDashboard';
import Register from './components/auth/Register';
import OrderManagement from './components/dashboard/vendor/OrderManagement'; // Import OrderManagement
import StockManagement from './components/dashboard/vendor/StockManagement'; // Import StockManagement
import EcommercePage from './components/pages/ViewAndBuyMedicines';
import AboutUs from './components/landing/AboutUs';
import Help from './components/auth/Help';
import Contact from './components/auth/Contact';
import ProfilePage from './components/dashboard/public/Profile';
import OrderConfirmation from './components/auth/OrderConfirmation';
import AddProduct from './components/dashboard/vendor/AddProduct';
import SalesReport from './components/dashboard/vendor/SalesReport';
import CommunicateAndExchangeStock from './components/CommunicateAndExchangeStock';
import UsersList from './components/Users/UsersList';
import VendorRegister from './components/auth/VendorRegistration';
import GenericMedicinesPage from './components/landing/generic';

function App() {
  return (
    <Routes>
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/public-login" element={<PublicLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/view-buy-medicines" element={<EcommercePage />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/public-dashboard" element={<PublicDashboard />} />
      <Route path="/vendor-orders" element={<OrderManagement />} /> 
      <Route path="/vendor-stock" element={<StockManagement />} />
      <Route path="/help" element={<Help />} />
      <Route path="/" element={<PublicLogin />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<EcommercePage />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/" element={<OrderConfirmation />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/sales-reports" element={<SalesReport />} />
      <Route path="/sales-reports" element={<SalesReport />} />
      <Route path="/vendor-communication-sales" element={<CommunicateAndExchangeStock />} />
      <Route path="/users" element={<UsersList />} />  
      <Route path="/vregister" element={<VendorRegister />} />
      <Route path="/generic" element={<GenericMedicinesPage />} />

    </Routes>
  );
}

export default App;
