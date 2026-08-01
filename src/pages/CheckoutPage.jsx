import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Truck, MapPin, ShieldCheck, Phone, MessageSquare, 
  Clock, Plus, Minus, Trash2, CheckCircle2, Lock, UserCheck, ArrowRight,
  AlertTriangle, Navigation
} from 'lucide-react';

export default function CheckoutPage({ 
  cartItems = [], 
  setCartItems = () => {}, 
  userAccount, 
  setUserAccount = () => {}, 
  onGoToHome, 
  onGoToTrackingDashboard 
}) {
  // Transport Vehicle Choice
  const [vehicleChoice, setVehicleChoice] = useState('motorcycle'); // motorcycle | car | van | tricycle | truck

  // Dynamic Distance State (in km)
  const [deliveryDistanceKm, setDeliveryDistanceKm] = useState(8.5);

  // Single vs Multiple Pickup Toggle
  const [isMultiPickup, setIsMultiPickup] = useState(false);
  const [pickupLocations, setPickupLocations] = useState([
    "Shop 12, Alaba Electronics Market, Lagos",
    "Block B, Trade Fair Complex, Badagry Expressway"
  ]);

  // Delivery Address State (Auto-filled from User Profile if logged in)
  const [deliveryAddress, setDeliveryAddress] = useState(
    userAccount?.primaryDeliveryAddress || "Plot 15, Admiralty Way, Lekki Phase 1, Lagos"
  );

  // Dispatch Assignment & Timer State
  const [assignedRider, setAssignedRider] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(1800); // 30 minutes countdown (1800s)
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Authentication Popup Modal State for Unauthenticated Buyers
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Account Form Inputs
  const [loginInput, setLoginInput] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPaymentMethod, setRegPaymentMethod] = useState('card_escrow');

  // Successful Order State
  const [placedOrderId, setPlacedOrderId] = useState(null);

  // Mock Available Nearby Riders Filtered by Online Availability
  const availableRidersList = [
    { id: "RIDER-101", name: "Tunde Bakare", phone: "2348031112233", distanceKm: 0.8, vehicle: "motorcycle", rating: 4.9, liveLat: 6.5244, liveLng: 3.3792, isAvailable: true },
    { id: "RIDER-102", name: "Emeka Okafor", phone: "2348054445566", distanceKm: 1.4, vehicle: "van", rating: 4.8, liveLat: 6.5250, liveLng: 3.3800, isAvailable: true },
    { id: "RIDER-103", name: "Sani Musa", phone: "2348029998877", distanceKm: 2.1, vehicle: "truck", rating: 5.0, liveLat: 6.5260, liveLng: 3.3810, isAvailable: true },
  ];

  // Sync delivery address when user logged in status updates
  useEffect(() => {
    if (userAccount?.primaryDeliveryAddress) {
      setDeliveryAddress(userAccount.primaryDeliveryAddress);
    }
  }, [userAccount]);

  // Quantity Management
  const handleUpdateQuantity = (index, delta) => {
    const updated = [...cartItems];
    const currentQty = updated[index].quantity || 1;
    const maxStock = updated[index].stockCount || 99;

    const newQty = currentQty + delta;
    if (newQty >= 1 && newQty <= maxStock) {
      updated[index].quantity = newQty;
      setCartItems(updated);
    }
  };

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // Add/Remove Multi-pickup inputs (Up to 10 max)
  const handleAddPickupLocation = () => {
    if (pickupLocations.length < 10) {
      setPickupLocations([...pickupLocations, ""]);
    } else {
      alert("Maximum of 10 pickup locations allowed per order.");
    }
  };

  const handleUpdatePickupLocation = (index, value) => {
    const updated = [...pickupLocations];
    updated[index] = value;
    setPickupLocations(updated);
  };

  const handleRemovePickupLocation = (index) => {
    if (pickupLocations.length > 1) {
      setPickupLocations(pickupLocations.filter((_, i) => i !== index));
    }
  };

  // Distance & Vehicle Base Pricing Map
  const vehicleRates = {
    motorcycle: { base: 1500, perKm: 150 },
    tricycle: { base: 2500, perKm: 200 },
    car: { base: 3500, perKm: 300 },
    van: { base: 8000, perKm: 500 },
    truck: { base: 18000, perKm: 800 },
  };

  // Pricing Calculations
  const currentVehicleRate = vehicleRates[vehicleChoice] || vehicleRates.motorcycle;
  const calculatedDistanceFee = Math.round(currentVehicleRate.base + (deliveryDistanceKm * currentVehicleRate.perKm));
  const multiStopExtraFee = isMultiPickup ? (pickupLocations.length - 1) * 1500 : 0;
  
  const totalShippingFee = cartItems.length === 0 && cartItems !== null ? 0 : (calculatedDistanceFee + multiStopExtraFee);

  // Subtotal for all items
  const productsTotal = cartItems.length > 0 
    ? cartItems.reduce((acc, item) => acc + ((item.salePrice || 15000) * (item.quantity || 1)), 0)
    : 45000;

  const platformFee = Math.round((productsTotal + totalShippingFee) * 0.03);
  const grandTotal = productsTotal + totalShippingFee + platformFee;

  // Individual item breakdown calculator helper
  const getItemBreakdown = (item) => {
    const itemPriceTotal = (item.salePrice || 15000) * (item.quantity || 1);
    const itemShareRatio = productsTotal > 0 ? itemPriceTotal / productsTotal : 0;
    
    const itemShipping = Math.round(totalShippingFee * itemShareRatio);
    const itemPlatform = Math.round(platformFee * itemShareRatio);
    const itemTotal = itemPriceTotal + itemShipping + itemPlatform;

    return { itemPriceTotal, itemShipping, itemPlatform, itemTotal };
  };

  // 30-Minute Dispatch Response Timer Effect
  useEffect(() => {
    let countdownInterval;
    if (isTimerActive && timerSeconds > 0) {
      countdownInterval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
      alert("⚠️ 30-minute timeout reached! The selected dispatch rider did not confirm. Auto-reassigning to the next nearest available rider...");
      setAssignedRider(availableRidersList[1]);
      setTimerSeconds(1800);
      setIsTimerActive(true);
    }
    return () => clearInterval(countdownInterval);
  }, [isTimerActive, timerSeconds]);

  const handleSelectRider = (rider) => {
    setAssignedRider(rider);
    setTimerSeconds(1800);
    setIsTimerActive(true);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate Precise WhatsApp Dispatch Link
  const getWhatsAppDispatchLink = (rider) => {
    const pickupText = isMultiPickup 
      ? pickupLocations.map((loc, i) => `%0A - Stop ${i+1}: ${encodeURIComponent(loc)}`).join('')
      : encodeURIComponent(pickupLocations[0]);

    const message = `Hello ${encodeURIComponent(rider.name)}, you have a new BravoMart Dispatch Request!%0A%0A` +
      `*Total Goods Value:* ₦${productsTotal.toLocaleString()}%0A` +
      `*Est. Distance:* ${deliveryDistanceKm} km%0A` +
      `*Delivery Payout:* ₦${totalShippingFee.toLocaleString()}%0A` +
      `*Pickup Location(s):* ${pickupText}%0A` +
      `*Final Delivery Address:* ${encodeURIComponent(deliveryAddress)}%0A` +
      `*Live GPS Marker:* https://maps.google.com/?q=${rider.liveLat},${rider.liveLng}%0A%0A` +
      `Please accept within 30 minutes to confirm pickup.`;

    return `https://wa.me/${rider.phone}?text=${message}`;
  };

  // Handle Order Placement & Generate B + 10 Digit Order ID
  const handlePlaceOrder = () => {
    if (!userAccount) {
      setShowAuthModal(true);
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
    const newOrderId = "B" + random10Digits;

    setPlacedOrderId(newOrderId);
  };

  // Submit Registration Modal
  const handleRegisterUser = (e) => {
    e.preventDefault();
    const newUser = {
      fullName: regFullName,
      primaryDeliveryAddress: regAddress,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      paymentMethod: regPaymentMethod,
      role: 'customer'
    };
    setUserAccount(newUser);
    setDeliveryAddress(regAddress);
    setShowAuthModal(false);
  };

  // Submit Login Modal
  const handleLoginUser = (e) => {
    e.preventDefault();
    const existingUser = {
      fullName: loginInput + " (Customer)",
      primaryDeliveryAddress: "Block 14, Festac Town, Lagos",
      email: loginInput,
      phone: "08033992211",
      role: 'customer'
    };
    setUserAccount(existingUser);
    setDeliveryAddress(existingUser.primaryDeliveryAddress);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-3 sm:px-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-brandSky-dark flex-shrink-0" size={24} /> 
            <span>BravoMart Checkout & Smart Dispatch</span>
          </h1>
          <button 
            onClick={onGoToHome} 
            className="text-xs bg-slate-200 hover:bg-slate-300 font-bold px-3 py-2 rounded-xl transition-colors"
          >
            ← Back to Store
          </button>
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {placedOrderId ? (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Order Placed Successfully!</h2>
            <p className="text-xs text-gray-500">Your order has been secured in Escrow and assigned to the nearest dispatch rider.</p>
            
            <div className="bg-slate-900 text-white p-4 rounded-xl text-xs font-mono space-y-1">
              <span className="text-slate-400 block text-[10px]">OFFICIAL TRACKING ID</span>
              <span className="text-xl font-bold text-amber-300">{placedOrderId}</span>
            </div>

            <button 
              onClick={() => onGoToTrackingDashboard ? onGoToTrackingDashboard(placedOrderId) : alert(`Navigating to dashboard with Order ID: ${placedOrderId}`)}
              className="w-full bg-brandSky hover:bg-brandSky-dark text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Truck size={16} /> Track Your Order on Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Column: Cart Items & Delivery Configuration */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* CART ITEMS LIST WITH QUANTITY CONTROLS */}
              {cartItems.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center justify-between">
                    <span>Cart Items ({cartItems.length})</span>
                    <span className="text-xs text-slate-400 font-normal">Modify quantities below</span>
                  </h3>

                  <div className="divide-y space-y-3">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="pt-3 flex items-center justify-between gap-3 text-xs">
                        {item.image && <img src={item.image} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0" />}
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{item.title || "Standard Cart Item"}</h4>
                          {item.vendorName && <p className="text-gray-400 text-[10px]">Vendor: {item.vendorName}</p>}
                          <p className="font-extrabold text-brandSky-dark mt-0.5">
                            ₦{(item.salePrice || 15000).toLocaleString()} each
                          </p>
                        </div>

                        {/* Quantity Increase / Decrease */}
                        <div className="flex items-center border rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                          <button 
                            onClick={() => handleUpdateQuantity(idx, -1)}
                            className="p-1.5 hover:bg-slate-200 text-gray-600"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 sm:px-3 font-bold text-xs">{item.quantity || 1}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(idx, 1)}
                            className="p-1.5 hover:bg-slate-200 text-gray-600"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="font-black text-gray-900 block">
                            ₦{((item.salePrice || 15000) * (item.quantity || 1)).toLocaleString()}
                          </span>
                          <button onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700 text-[10px] mt-1 ml-auto block">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Distance Calculator Section */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <Navigation size={18} className="text-brandSky-dark" /> Delivery Distance Calculator
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-brandSky-dark bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {deliveryDistanceKm} km
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Adjust estimated distance from merchant to your destination to calculate live distance-based delivery rates.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      step="0.5"
                      value={deliveryDistanceKm}
                      onChange={(e) => setDeliveryDistanceKm(parseFloat(e.target.value))}
                      className="w-full accent-brandSky cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>

                  {/* Preset Distance Buttons for quick mobile selection */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[3, 8.5, 15, 30, 50, 75].map((dist) => (
                      <button
                        key={dist}
                        type="button"
                        onClick={() => setDeliveryDistanceKm(dist)}
                        className={`text-[11px] px-3 py-1 rounded-lg font-semibold transition-all ${
                          deliveryDistanceKm === dist 
                            ? 'bg-brandSky text-white shadow-sm' 
                            : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                        }`}
                      >
                        {dist} km
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pickup Route Configurator (Single vs Multi-location) */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <MapPin size={18} className="text-brandSky-dark" /> Pickup Location Settings
                  </h3>

                  <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold w-full sm:w-auto">
                    <button 
                      onClick={() => setIsMultiPickup(false)}
                      className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition-all ${!isMultiPickup ? 'bg-white shadow text-brandSky-dark' : 'text-gray-500'}`}
                    >
                      Single Pickup
                    </button>
                    <button 
                      onClick={() => setIsMultiPickup(true)}
                      className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition-all ${isMultiPickup ? 'bg-white shadow text-brandSky-dark' : 'text-gray-500'}`}
                    >
                      Multi-Location (Max 10)
                    </button>
                  </div>
                </div>

                {/* Pickup Address Inputs */}
                <div className="space-y-3">
                  {pickupLocations.map((loc, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 w-14 sm:w-16 flex-shrink-0">Stop #{idx + 1}:</span>
                      <input 
                        type="text" 
                        value={loc}
                        onChange={(e) => handleUpdatePickupLocation(idx, e.target.value)}
                        placeholder="Enter merchant store address..."
                        className="flex-1 text-xs p-2.5 sm:p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky min-w-0"
                      />
                      {isMultiPickup && pickupLocations.length > 1 && (
                        <button 
                          onClick={() => handleRemovePickupLocation(idx)}
                          className="text-red-500 hover:text-red-700 p-2 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}

                  {isMultiPickup && pickupLocations.length < 10 && (
                    <button 
                      onClick={handleAddPickupLocation}
                      className="mt-2 text-xs font-bold text-brandSky-dark hover:underline flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Another Pickup Location ({pickupLocations.length}/10)
                    </button>
                  )}
                </div>

                {/* Final Delivery Address */}
                <div className="mt-5 pt-4 border-t">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Final Destination Address {userAccount && "(Auto-filled from account profile)"} *
                  </label>
                  <input 
                    type="text" 
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your street address for delivery..."
                    className="w-full text-xs p-2.5 sm:p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">You can change this address anytime before making payment.</p>
                </div>
              </div>

              {/* Vehicle Sizing Choice */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-sm text-gray-900 mb-1 flex items-center gap-2">
                  <Truck size={18} className="text-brandSky-dark" /> Select Vehicle Size
                </h3>
                <p className="text-xs text-gray-500 mb-4">Rates automatically re-calculate based on overall travel distance ({deliveryDistanceKm} km).</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
                  {[
                    { id: 'motorcycle', name: 'Motorcycle', label: 'Small packages', base: vehicleRates.motorcycle.base, perKm: vehicleRates.motorcycle.perKm },
                    { id: 'tricycle', name: 'Tricycle (Keke)', label: 'Medium boxes', base: vehicleRates.tricycle.base, perKm: vehicleRates.tricycle.perKm },
                    { id: 'car', name: 'Sedan / Car', label: 'Fragile items', base: vehicleRates.car.base, perKm: vehicleRates.car.perKm },
                    { id: 'van', name: 'Delivery Van', label: 'Bulk electronics', base: vehicleRates.van.base, perKm: vehicleRates.van.perKm },
                    { id: 'truck', name: 'Heavy Truck', label: 'Machines / Heavy', base: vehicleRates.truck.base, perKm: vehicleRates.truck.perKm },
                  ].map((v) => {
                    const estimatedFee = Math.round(v.base + (deliveryDistanceKm * v.perKm));
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleChoice(v.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          vehicleChoice === v.id
                            ? 'border-brandSky bg-sky-50 shadow-sm font-bold ring-1 ring-brandSky'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">{v.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{v.label}</p>
                        <p className="text-brandSky-dark font-extrabold mt-2 text-xs sm:text-sm">₦{estimatedFee.toLocaleString()}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nearest Available Dispatch Riders List */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <Truck size={18} className="text-emerald-600" /> Nearest Available Dispatch Riders
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                    Online & Active
                  </span>
                </div>

                <div className="space-y-3">
                  {availableRidersList.map((rider) => (
                    <div 
                      key={rider.id}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        assignedRider?.id === rider.id ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{rider.name}</span>
                          <span className="text-[10px] bg-sky-100 text-brandSky-dark font-extrabold px-2 py-0.5 rounded">
                            {rider.vehicle.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {rider.distanceKm} km away from pickup point • ⭐ {rider.rating} Rating
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a 
                          href={getWhatsAppDispatchLink(rider)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => handleSelectRider(rider)}
                          className="flex-1 sm:flex-none text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm"
                        >
                          <MessageSquare size={14} /> Send WhatsApp / SMS
                        </a>

                        <a 
                          href={`tel:${rider.phone}`}
                          className="text-xs bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-1"
                        >
                          <Phone size={14} /> Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Timer Status Banner */}
                {assignedRider && (
                  <div className="mt-4 p-3.5 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Clock size={20} className="text-amber-600 animate-spin flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-amber-900 truncate">Rider Confirmation Timer: {assignedRider.name}</p>
                        <p className="text-amber-700 text-[10px] sm:text-[11px]">If no response within 30 minutes, delivery auto-reassigns.</p>
                      </div>
                    </div>
                    <span className="font-mono font-black text-amber-900 text-sm sm:text-base bg-amber-200/60 px-2.5 py-1 rounded-lg">
                      {formatTimer(timerSeconds)}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Pricing Breakdown */}
            <div className="lg:col-span-5">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-md sticky top-20 sm:top-28 space-y-5">
                <h3 className="font-bold text-base text-gray-900 border-b pb-3">Order Price Summary</h3>

                {/* INDIVIDUAL PRODUCT BREAKDOWN SUMMARY AREA */}
                <div className="space-y-3 text-xs border-b pb-4">
                  <h4 className="font-bold text-gray-700 text-[11px] uppercase tracking-wide">Itemized Cost Breakdown</h4>

                  {cartItems.length > 0 ? (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {cartItems.map((item, idx) => {
                        const breakdown = getItemBreakdown(item);
                        return (
                          <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                            <div className="flex justify-between font-bold text-gray-900">
                              <span className="truncate pr-2">{item.title || `Product #${idx + 1}`} (x{item.quantity || 1})</span>
                              <span>₦{breakdown.itemPriceTotal.toLocaleString()}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 text-[10px] text-gray-500 gap-1 pt-1 border-t border-slate-200/50">
                              <div>Shipping Share: <span className="font-semibold text-gray-700">₦{breakdown.itemShipping.toLocaleString()}</span></div>
                              <div>Platform Fee (3%): <span className="font-semibold text-gray-700">₦{breakdown.itemPlatform.toLocaleString()}</span></div>
                            </div>

                            <div className="flex justify-between text-[11px] font-extrabold text-slate-800 pt-0.5">
                              <span>Product Total:</span>
                              <span className="text-brandSky-dark">₦{breakdown.itemTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-2.5 rounded-lg border text-gray-500 text-[11px] text-center italic">
                      No items currently in cart. Showing estimated totals below.
                    </div>
                  )}
                </div>

                {/* OVERALL TOTALS BEFORE FINAL PAYMENT */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Products Combined Subtotal:</span>
                    <span className="font-bold text-gray-900">₦{productsTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Total Shipping ({vehicleChoice.toUpperCase()} - {deliveryDistanceKm}km):</span>
                    <span className="font-bold text-gray-900">₦{totalShippingFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Total Platform Service Charge (3%):</span>
                    <span className="font-bold text-gray-900">₦{platformFee.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t flex justify-between items-baseline text-base font-black text-gray-900">
                    <span>Overall Total Payable:</span>
                    <span className="text-lg sm:text-xl text-brandSky-dark">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {userAccount ? (
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 text-emerald-800 font-semibold">
                    <UserCheck size={16} className="flex-shrink-0" /> 
                    <span className="truncate">Logged in as: {userAccount.fullName}</span>
                  </div>
                ) : (
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium">
                    ⚠️ You will be prompted to login or create an account before final payment.
                  </div>
                )}

                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={20} /> Proceed to Secure Escrow Payment
                </button>

                <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-100 text-[11px] text-sky-800 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" /> BravoMart Security Guarantee
                  </p>
                  <p>Funds remain locked in 7-day escrow until you verify item delivery and condition.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* AUTHENTICATION POPUP MODAL FOR UNREGISTERED BUYERS */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white max-w-md w-full p-5 sm:p-6 rounded-2xl shadow-2xl border border-slate-100 relative my-auto">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold p-1"
            >
              ✕
            </button>

            <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
              <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'login' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'register' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                Create Account
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginUser} className="space-y-4 text-xs">
                <h3 className="font-extrabold text-gray-900 text-base">Sign In to Complete Order</h3>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Email or Phone</label>
                  <input 
                    type="text" 
                    required 
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full p-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-brandSky"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Password</label>
                  <input 
                    type="password" 
                    required 
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-brandSky"
                  />
                </div>
                <button type="submit" className="w-full bg-brandSky hover:bg-brandSky-dark text-white font-extrabold py-3 rounded-xl">
                  Sign In & Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterUser} className="space-y-3 text-xs">
                <h3 className="font-extrabold text-gray-900 text-base">New Account Registration</h3>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-2.5 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Delivery Address *</label>
                  <input 
                    type="text" 
                    required 
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Street, City, State"
                    className="w-full p-2.5 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="user@mail.com"
                      className="w-full p-2.5 bg-slate-50 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Phone *</label>
                    <input 
                      type="tel" 
                      required 
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="08012345678"
                      className="w-full p-2.5 bg-slate-50 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Password *</label>
                  <input 
                    type="password" 
                    required 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-50 border rounded-lg"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl mt-2">
                  Create Account & Place Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}