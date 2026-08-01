import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AccountPage from './pages/AccountPage';
import AdminAiAssistant from './pages/AdminAiAssistant';
import BravoAdmin from './pages/BravoAdmin';
import BravoSuperAdmin from './pages/BravoSuperAdmin';
import CheckoutPage from './pages/CheckoutPage';
import DispatcherPortal from './pages/DispatcherPortal';
import Help from './pages/Help';
import VendorLogin from './pages/VendorLogin';
import VendorRegister from './pages/VendorRegister';

// Components
import DispatchRiderTracker from './components/DispatchRiderTracker';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [activeVendor, setActiveVendor] = useState(null);
  const [pendingVendorsCount, setPendingVendorsCount] = useState(3);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
        <Routes>
          {/* Main Home Route */}
          <Route 
            path="/" 
            element={
              <Home 
                activeVendor={activeVendor}
                setActiveVendor={setActiveVendor}
                pendingVendorsCount={pendingVendorsCount}
                cartItems={cartItems} 
                setCartItems={setCartItems} 
              />
            } 
          />

          {/* Individual Page Routes with real URL paths */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<AccountPage />} />
          
          <Route path="/vendor_login" element={<VendorLogin setActiveVendor={setActiveVendor} />} />
          <Route path="/vendor_register" element={<VendorRegister />} />
          <Route path="/sell" element={<VendorRegister />} />

          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />

          {/* Admin & Portal Routes */}
          <Route path="/BravoAdmin" element={<BravoAdmin />} />
          <Route path="/BravoSuperAdmin" element={<BravoSuperAdmin />} />
          <Route path="/AdminAiAssistant" element={<AdminAiAssistant />} />
          <Route path="/DispatcherPortal" element={<DispatcherPortal />} />
          <Route path="/tracker" element={<DispatchRiderTracker />} />

          {/* Fallback for unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}