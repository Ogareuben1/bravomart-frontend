import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, UserCheck, CheckCircle2, Truck, CreditCard, Building2, Lock } from 'lucide-react';

import CartSummary from './checkout/CartSummary';
import DispatchConfigurator from './checkout/DispatchConfigurator';

export default function CheckoutPage({ 
  cartItems = [], 
  setCartItems = () => {}, 
  userAccount, 
  setUserAccount = () => {}, 
  onGoToHome, 
  onGoToTrackingDashboard 
}) {
  const [vehicleChoice, setVehicleChoice] = useState('motorcycle');
  const [deliveryAddress, setDeliveryAddress] = useState(
    userAccount?.primaryDeliveryAddress || "Plot 15, Admiralty Way, Lekki Phase 1, Lagos"
  );

  const [assignedRider, setAssignedRider] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(1800);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  
  // Payment Flow State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // 'card' | 'transfer'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Form states for login/register
  const [loginInput, setLoginInput] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Base rate per kg per km in NGN
  const BASE_RATE_PER_KG_PER_KM = 50;

  // Available dispatch riders catalog
  const availableRidersList = [
    { id: "RIDER-101", name: "Tunde Bakare", phone: "2348031112233", distanceKm: 0.8, vehicle: "motorcycle", rating: 4.9 },
    { id: "RIDER-102", name: "Emeka Okafor", phone: "2348054445566", distanceKm: 1.4, vehicle: "van", rating: 4.8 },
    { id: "RIDER-103", name: "Sani Musa", phone: "2348029998877", distanceKm: 2.1, vehicle: "truck", rating: 5.0 },
    { id: "RIDER-104", name: "Kemi Adeleke", phone: "2348011223344", distanceKm: 0.5, vehicle: "motorcycle", rating: 4.7 },
    { id: "RIDER-105", name: "Buchi Nnamdi", phone: "2348099887766", distanceKm: 3.0, vehicle: "car", rating: 4.9 },
  ];

  // Filter riders by selected vehicle capacity
  const filteredRiders = availableRidersList.filter(r => r.vehicle === vehicleChoice);

  // Sync delivery address with logged-in user account
  useEffect(() => {
    if (userAccount?.primaryDeliveryAddress) {
      setDeliveryAddress(userAccount.primaryDeliveryAddress);
    }
  }, [userAccount]);

  // Active timer for dispatch rider confirmation
  useEffect(() => {
    let countdownInterval;
    if (isTimerActive && timerSeconds > 0) {
      countdownInterval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
      alert("⚠️ Timer reached! Auto-reassigning rider...");
      if (filteredRiders.length > 0) setAssignedRider(filteredRiders[0]);
      setTimerSeconds(1800);
      setIsTimerActive(true);
    }
    return () => clearInterval(countdownInterval);
  }, [isTimerActive, timerSeconds, filteredRiders]);

  // Extract unique pickup locations from cart items
  const pickupLocations = Array.from(
    new Set(
      cartItems.map(item => item.vendorAddress || item.pickupAddress || "Central Marketplace Warehouse, Lagos")
    )
  );

  const isMultiPickup = pickupLocations.length > 1;
  const ratePerKgKm = isMultiPickup ? BASE_RATE_PER_KG_PER_KM * 0.95 : BASE_RATE_PER_KG_PER_KM;

  // Distance Calculator Simulation (Defaults < 1km to 1km)
  const calculateItemDistance = (item) => {
    const rawDistance = item.distanceKm || 8.5;
    return Math.max(1, rawDistance);
  };

  // Itemized shipping cost formula
  const calculateItemShippingFee = (item) => {
    const dist = calculateItemDistance(item);
    const weight = item.weightKg || 1;
    return Math.round(dist * weight * ratePerKgKm);
  };

  const totalShippingFee = cartItems.reduce((acc, item) => acc + calculateItemShippingFee(item), 0);
  const productsTotal = cartItems.reduce((acc, item) => acc + ((item.salePrice || 15000) * (item.quantity || 1)), 0);
  const platformFee = Math.round((productsTotal + totalShippingFee) * 0.03);
  const grandTotal = productsTotal + totalShippingFee + platformFee;

  const handleUpdateQuantity = (index, delta) => {
    const updated = [...cartItems];
    const currentQty = updated[index].quantity || 1;
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      updated[index].quantity = newQty;
      setCartItems(updated);
    }
  };

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // MOCK LOGIN HANDLER: ACCEPTS ANY EMAIL & PASSWORD
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Fallback display name extraction from email input
    const extractedName = loginInput.includes('@') 
      ? loginInput.split('@')[0] 
      : loginInput || "Test Buyer";

    setUserAccount({
      fullName: extractedName.charAt(0).toUpperCase() + extractedName.slice(1),
      email: loginInput || "testbuyer@bravomart.com",
      primaryDeliveryAddress: deliveryAddress
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setUserAccount({
      fullName: regFullName || "New Test Buyer",
      email: regEmail || "newbuyer@bravomart.com",
      phone: regPhone || "08012345678",
      primaryDeliveryAddress: regAddress || deliveryAddress
    });
    if (regAddress) setDeliveryAddress(regAddress);
  };

  const handleFinalPayment = (method) => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
    setPlacedOrderId("B" + random10Digits);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-3 sm:px-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-sky-600 flex-shrink-0" size={24} /> 
            <span>BravoMart Checkout & Automated Dispatch</span>
          </h1>
          <button onClick={onGoToHome} className="text-xs bg-slate-200 hover:bg-slate-300 font-bold px-3 py-2 rounded-xl">
            ← Back to Store
          </button>
        </div>

        {placedOrderId ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-emerald-200 shadow-xl text-center space-y-4">
            <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-black text-gray-900">Order Placed!</h2>
            <p className="text-xs text-gray-500">Payment method: <span className="font-bold text-gray-800 uppercase">{selectedPaymentMethod}</span></p>
            <div className="bg-slate-900 text-white p-4 rounded-xl text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">TRACKING ID</span>
              <span className="text-xl font-bold text-amber-300">{placedOrderId}</span>
            </div>
            <button 
              onClick={() => onGoToTrackingDashboard?.(placedOrderId)} 
              className="w-full bg-sky-600 text-white font-extrabold text-xs py-3.5 rounded-xl hover:bg-sky-700 transition-colors"
            >
              <Truck size={16} className="inline mr-1" /> Track Order
            </button>
          </div>
        ) : !userAccount ? (
          /* SILENT AUTHENTICATION ENTRY POINT BEFORE CHECKOUT ACCESS */
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-900">
                {authMode === 'login' ? 'Sign In to Proceed' : 'Create Buyer Account'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {authMode === 'login' ? 'Enter any email & password to test the checkout interface.' : 'Register to test Escrow purchase flows.'}
              </p>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email or Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Enter any email..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Enter any password..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-xl shadow transition-all"
                >
                  Login & Access Checkout UI
                </button>

                <div className="text-center pt-2">
                  <p className="text-slate-500 text-xs">
                    No account?{" "}
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('register')} 
                      className="text-sky-600 font-bold hover:underline"
                    >
                      Create one here
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="Chinedu Adeleke"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="buyer@example.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="08012345678"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Delivery Address *</label>
                  <input 
                    type="text" 
                    required
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Street name, City, State"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Password *</label>
                  <input 
                    type="password" 
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl shadow mt-2 transition-all"
                >
                  Create Account & Access Checkout
                </button>

                <div className="text-center pt-2">
                  <p className="text-slate-500 text-xs">
                    Already have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('login')} 
                      className="text-sky-600 font-bold hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* MAIN CHECKOUT INTERFACE FOR LOGGED-IN USERS */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-7">
              <DispatchConfigurator 
                pickupLocations={pickupLocations}
                isMultiPickup={isMultiPickup}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
                userAccount={userAccount}
                vehicleChoice={vehicleChoice}
                setVehicleChoice={setVehicleChoice}
                filteredRiders={filteredRiders}
                assignedRider={assignedRider}
                onSelectRider={(rider) => { setAssignedRider(rider); setTimerSeconds(1800); setIsTimerActive(true); }}
                timerSeconds={timerSeconds}
                formatTimer={(sec) => `${Math.floor(sec/60).toString().padStart(2, '0')}:${(sec%60).toString().padStart(2, '0')}`}
                getWhatsAppDispatchLink={(rider) => `https://wa.me/${rider.phone}`}
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <CartSummary 
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                calculateItemShippingFee={calculateItemShippingFee}
                calculateItemDistance={calculateItemDistance}
                productsTotal={productsTotal}
                totalShippingFee={totalShippingFee}
                platformFee={platformFee}
                grandTotal={grandTotal}
                isMultiPickup={isMultiPickup}
              />

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs flex items-center justify-between text-emerald-800 font-semibold">
                <span className="flex items-center gap-1.5"><UserCheck size={16} /> Logged in as: {userAccount.fullName}</span>
                <button onClick={() => setUserAccount(null)} className="text-[10px] text-red-600 underline">Switch Account</button>
              </div>

              {/* PAYMENT SELECTION STEP */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md space-y-3">
                <h3 className="font-bold text-xs text-gray-900">How would you like to pay?</h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setSelectedPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      selectedPaymentMethod === 'card' 
                        ? 'bg-sky-50 border-sky-600 text-sky-700 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-gray-600 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard size={18} /> Pay with Card
                  </button>

                  <button
                    onClick={() => setSelectedPaymentMethod('transfer')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      selectedPaymentMethod === 'transfer' 
                        ? 'bg-sky-50 border-sky-600 text-sky-700 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-gray-600 hover:bg-slate-100'
                    }`}
                  >
                    <Building2 size={18} /> Bank Transfer
                  </button>
                </div>

                {selectedPaymentMethod && (
                  <button 
                    onClick={() => handleFinalPayment(selectedPaymentMethod)}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <ShieldCheck size={20} /> Complete {selectedPaymentMethod === 'card' ? 'Card Payment' : 'Bank Transfer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}