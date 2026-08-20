import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Data imports
import { CATEGORIES, PRODUCTS } from '../data/mockData';

// Custom Application Components
import Navbar from '../components/Navbar';
import AiScamModal from '../components/AiScamModal';
import AiSearchResults from '../components/AiSearchResults';
import Footer from '../components/Footer';

import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { MarketSectors } from '../components/MarketSectors';
import { OrderTracker } from '../components/OrderTracker';
import RightSidebar from '../components/RightSidebar';

// Icons
import { 
  ShieldCheck, Sparkles, DollarSign, MapPin, Award, X, ShoppingCart, 
  CheckCircle2, Filter, ChevronDown, Menu, Navigation, Mic, MicOff, Sun, Moon 
} from 'lucide-react';

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">Image Unavailable</text></svg>';

const calculateGpsDistanceKm = (lat, lng) => {
  if (!lat || !lng) return 2.5;
  return Math.round((Math.abs(lat) % 10 + Math.abs(lng) % 10) * 10) / 10;
};

export default function Marketplace({ 
  activeVendor, 
  setActiveVendor, 
  pendingVendorsCount = 0,
  cartItems = [],
  setCartItems
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [cartCount, setCartCount] = useState(cartItems.length || 0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [flashDropSlideIndex, setFlashDropSlideIndex] = useState(0);

  const [aiFilter, setAiFilter] = useState("none"); 
  const [scamModalProduct, setScamModalProduct] = useState(null);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const [orderTrackingId, setOrderTrackingId] = useState("");
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // NEW FEATURE STATES: Theme & Voice Listening
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearchQuery(urlSearch);
  }, [urlCategory, urlSearch]);

  useEffect(() => {
    if (cartItems) setCartCount(cartItems.length);
  }, [cartItems]);

  // VOICE SEARCH IMPLEMENTATION
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSearchChange(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAddToCart = (product) => {
    if (setCartItems) {
      setCartItems((prev) => [...prev, product]);
    } else {
      setCartCount((c) => c + 1);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    const params = new URLSearchParams();
    if (categoryId !== "all") params.set('category', categoryId);
    setSearchParams(params);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const handleTrackOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (orderTrackingId.trim()) {
      setIsLiveTracking(true);
    } else {
      alert("Please enter a valid order tracking ID (e.g., BM-9041).");
    }
  };

  useEffect(() => {
    if (!PRODUCTS || PRODUCTS.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const flashDrops = useMemo(() => {
    return PRODUCTS ? PRODUCTS.filter((p) => p.isFlashDrop || p.salePrice < p.originalPrice) : [];
  }, []);

  useEffect(() => {
    if (flashDrops.length === 0) return;
    const flashTimer = setInterval(() => {
      setFlashDropSlideIndex((prev) => (prev + 1) % flashDrops.length);
    }, 3500);
    return () => clearInterval(flashTimer);
  }, [flashDrops.length]);

  const processedProducts = useMemo(() => {
    let list = (PRODUCTS || []).filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
                            product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.vendorName && product.vendorName.toLowerCase().includes(searchQuery.toLowerCase()));
                            
      return matchesCategory && matchesSearch;
    });

    if (aiFilter === "cheapest") {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (aiFilter === "nearest") {
      list.sort((a, b) => {
        const distA = a.coords ? calculateGpsDistanceKm(a.coords.lat, a.coords.lng) : (a.distanceKm || 0);
        const distB = b.coords ? calculateGpsDistanceKm(b.coords.lat, b.coords.lng) : (b.distanceKm || 0);
        return distA - distB;
      });
    } else if (aiFilter === "quality") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [selectedCategory, searchQuery, aiFilter]);

  return (
    <div className={`w-full flex flex-col min-h-screen transition-colors duration-300 font-sans text-lg ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* TOOLBAR FOR GLOBAL CONTROLS (LIGHT/DARK TOGGLE & VOICE ASSIST STATUS) */}
      <div className={`px-4 py-2 border-b text-xs flex justify-between items-center ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-sky-50 border-sky-100 text-sky-950'
      }`}>
        <span className="font-semibold flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-500" />
          Smart Marketplace Controls
        </span>

        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all cursor-pointer border ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
              : 'bg-white border-sky-200 text-sky-900 hover:bg-sky-100 shadow-sm'
          }`}
        >
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      {/* NAVBAR */}
      <Navbar
        activeVendor={activeVendor}
        setActiveVendor={setActiveVendor}
        pendingVendorsCount={pendingVendorsCount}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        handleCategorySelect={handleCategorySelect}
      />

      {/* VOICE SEARCH ACTION BAR / INPUT OVERRIDE DISPLAY */}
      <div className={`max-w-7xl mx-auto w-full px-4 pt-3 flex justify-end items-center gap-2`}>
        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${
            isListening 
              ? 'bg-red-600 text-white animate-pulse' 
              : isDarkMode 
                ? 'bg-slate-800 text-sky-400 hover:bg-slate-700 border border-slate-700' 
                : 'bg-sky-100 text-sky-900 hover:bg-sky-200 border border-sky-200'
          }`}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isListening ? 'Listening...' : 'Voice Search'}</span>
        </button>
      </div>

      {/* CATEGORY BAR */}
      <nav aria-label="Product categories" className="bg-sky-900 border-b border-sky-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          
          <div className="flex lg:hidden items-center justify-between">
            <span className="text-white font-bold text-base flex items-center gap-2">
              Category Menu
              {selectedCategory !== 'all' && (
                <span className="bg-sky-600 text-white text-xs px-2.5 py-1 rounded-full capitalize">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </span>

            <button
              type="button"
              id="toggle-category-menu-btn"
              name="toggleCategoryMenu"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="text-white bg-sky-800 hover:bg-sky-700 p-2 rounded-lg flex items-center gap-1.5 text-sm font-bold transition-all border border-sky-700 cursor-pointer"
            >
              {isCategoryMenuOpen ? (
                <>
                  <X size={20} /> Close Categories
                </>
              ) : (
                <>
                  <Menu size={20} /> Browse All Categories
                </>
              )}
            </button>
          </div>

          <div 
            className={`${
              isCategoryMenuOpen ? 'flex' : 'hidden'
            } lg:flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-sky-800/60 transition-all duration-300`}
          >
            {(CATEGORIES || []).map((cat) => (
              <button
                key={cat.id}
                type="button"
                id={`category-btn-${cat.id}`}
                name={`categoryBtn_${cat.id}`}
                onClick={() => {
                  handleCategorySelect(cat.id);
                  setIsCategoryMenuOpen(false);
                }}
                className={`flex items-center justify-between lg:justify-start gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer text-base font-semibold border ${
                  selectedCategory === cat.id 
                    ? "bg-sky-600 text-white border-sky-400 shadow-md font-bold scale-105" 
                    : "bg-sky-800/80 hover:bg-sky-700 text-white border-sky-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                
                {selectedCategory === cat.id && (
                  <span className="lg:hidden text-xs bg-white text-sky-900 font-extrabold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>
      </nav>

      {/* MOBILE EXPANDABLE DRAWER */}
      <div className="lg:hidden px-4 pt-4">
        <button
          type="button"
          id="toggle-mobile-filters"
          name="toggleMobileFilters"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`w-full py-3 px-4 rounded-xl flex items-center justify-between border shadow-sm cursor-pointer text-base font-bold ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-sky-200 text-sky-900'
          }`}
        >
          <span className="flex items-center gap-2">
            <Filter size={20} /> Sectors & Order Tracker
          </span>
          <ChevronDown size={20} className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>

        {showMobileFilters && (
          <div className={`mt-3 p-4 rounded-2xl border shadow-sm space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100'
          }`}>
            <MarketSectors categories={CATEGORIES || []} onSelectCategory={handleCategorySelect} />
            <OrderTracker 
              orderTrackingId={orderTrackingId} 
              setOrderTrackingId={setOrderTrackingId} 
              isLiveTracking={isLiveTracking} 
              onTrackOrder={handleTrackOrder} 
            />
          </div>
        )}
      </div>

      {/* THREE-COLUMN MARKETPLACE CONTENT */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* DESKTOP LEFT SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-2 space-y-5 sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1 scrollbar-none text-base">
          <div className="text-base font-semibold">
            <MarketSectors categories={CATEGORIES || []} onSelectCategory={handleCategorySelect} />
          </div>

          <div className="text-base font-semibold">
            <OrderTracker 
              orderTrackingId={orderTrackingId} 
              setOrderTrackingId={setOrderTrackingId} 
              isLiveTracking={isLiveTracking} 
              onTrackOrder={handleTrackOrder} 
            />
          </div>

          <div className="bg-gradient-to-br from-sky-900 to-sky-700 text-white rounded-2xl p-4 text-base shadow-md border border-sky-800">
            <ShieldCheck size={32} className="text-amber-300 mb-2" />
            <h4 className="font-bold text-lg mb-1">Escrow Protected</h4>
            <p className="text-sky-100 leading-relaxed text-sm font-medium">
              Funds are held safely in escrow for 7 days until you confirm receiving your exact product.
            </p>
          </div>
        </aside>

        {/* MAIN CENTER CONTENT */}
        <main className="lg:col-span-8 space-y-6 sm:space-y-8">
          {searchQuery.trim() !== "" && (
            <AiSearchResults 
              searchQuery={searchQuery}
              products={PRODUCTS || []}
              onAddToCart={handleAddToCart}
              onScanScam={(p) => setScamModalProduct(p)}
              onQuickSearch={(term) => handleSearchChange(term)}
            />
          )}

          <HeroSection 
            flashDrops={flashDrops}
            flashDropSlideIndex={flashDropSlideIndex}
            setFlashDropSlideIndex={setFlashDropSlideIndex}
            onAddToCart={handleAddToCart}
          />

          {/* GPS RIDER NAVIGATION BANNER */}
          <section className="relative overflow-hidden bg-gradient-to-r from-sky-950 via-sky-900 to-sky-800 text-white rounded-2xl p-6 shadow-xl border border-sky-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 space-y-3 max-w-lg text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                <Navigation size={14} className="animate-pulse text-sky-400" /> GPS Route Active
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Live GPS Delivery Route
              </h3>
              <p className="text-sky-100 text-base font-medium leading-relaxed">
                Track live dispatch riders navigating through optimized routes in real-time. Direct route access right on Google Maps navigation.
              </p>
              <div className="pt-2">
                <a 
                  href="https://www.google.com/maps" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Navigation size={22} className="fill-slate-950" /> Navigate Your Way
                </a>
              </div>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-sky-400/30">
              <img 
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80" 
                alt="Rider riding on track with GPS route" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-sky-200 bg-sky-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-sky-600/50">
                  📍 Active Track Route
                </span>
              </div>
            </div>
          </section>

          {/* AI QUICK FILTERS */}
          <section className={`p-5 sm:p-6 rounded-2xl shadow-sm border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className={`font-bold text-lg sm:text-xl flex items-center gap-2 ${
                isDarkMode ? 'text-slate-100' : 'text-gray-900'
              }`}>
                <Sparkles size={22} className="text-sky-600" /> AI Smart Search Assist
              </h3>
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Filter results intelligently:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-base">
              <button 
                type="button"
                id="filter-cheapest-btn"
                name="filterCheapestBtn"
                onClick={() => setAiFilter(aiFilter === "cheapest" ? "none" : "cheapest")}
                className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
                  aiFilter === "cheapest" ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <DollarSign size={20} /> Lowest Price
              </button>

              <button 
                type="button"
                id="filter-nearest-btn"
                name="filterNearestBtn"
                onClick={() => setAiFilter(aiFilter === "nearest" ? "none" : "nearest")}
                className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
                  aiFilter === "nearest" ? "bg-sky-700 text-white border-sky-700 shadow-sm" : "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100"
                }`}
              >
                <MapPin size={20} /> Nearest Vendor
              </button>

              <button 
                type="button"
                id="filter-quality-btn"
                name="filterQualityBtn"
                onClick={() => setAiFilter(aiFilter === "quality" ? "none" : "quality")}
                className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
                  aiFilter === "quality" ? "bg-amber-500 text-white border-amber-500 shadow-sm" : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <Award size={20} /> Top Quality
              </button>
            </div>
          </section>

          {/* PRODUCT LISTINGS GRID */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className={`font-bold text-2xl sm:text-3xl flex items-center gap-2 ${
                isDarkMode ? 'text-slate-100' : 'text-gray-900'
              }`}>
                🛒 Marketplace Products
              </h2>
              <span className={`text-sm sm:text-base font-bold ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Showing {processedProducts.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {processedProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProductModal(product)} 
                  className="cursor-pointer transition-transform hover:-translate-y-1.5 h-full"
                >
                  <ProductCard 
                    product={product} 
                    calculateGpsDistanceKm={calculateGpsDistanceKm} 
                    onAddToCart={(e) => {
                      if (e && e.stopPropagation) e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    onScanScam={(p, e) => {
                      if (e && e.stopPropagation) e.stopPropagation();
                      setScamModalProduct(p);
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* DESKTOP RIGHT SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pl-1 scrollbar-none text-base font-semibold">
          <RightSidebar 
            products={PRODUCTS || []} 
            activeSlideIndex={activeSlideIndex} 
            setActiveSlideIndex={setActiveSlideIndex}
            onAddToCart={handleAddToCart}
          />
        </aside>

      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto text-lg ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <button 
              type="button"
              id="close-product-modal-btn"
              name="closeProductModalBtn"
              onClick={() => setSelectedProductModal(null)}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <X size={22} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img 
                src={selectedProductModal.image || selectedProductModal.imgUrl || FALLBACK_IMAGE} 
                alt={selectedProductModal.title || 'Product Image'}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                className="w-full sm:w-56 h-56 object-cover rounded-xl border border-slate-100 shrink-0"
              />

              <div className="space-y-3 flex-1">
                <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {selectedProductModal.category || "General"}
                </span>

                <h3 className={`text-2xl sm:text-3xl font-bold leading-snug ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {selectedProductModal.title}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-600">
                    ₦{(selectedProductModal.salePrice || selectedProductModal.price || 0).toLocaleString()}
                  </span>
                  {selectedProductModal.originalPrice && (
                    <span className="text-base sm:text-lg text-slate-400 line-through">
                      ₦{selectedProductModal.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="text-base space-y-1.5 font-medium">
                  <p><strong className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>Vendor:</strong> {selectedProductModal.vendorName || "Verified Merchant"}</p>
                  <p className="flex items-center gap-2 text-emerald-500 font-semibold">
                    <CheckCircle2 size={20} /> Escrow Protection Available
                  </p>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-5 border-t text-base space-y-2 ${
              isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'
            }`}>
              <h4 className={`font-bold text-xl ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Product Description</h4>
              <p className="leading-relaxed font-medium">
                {selectedProductModal.description || "High-quality item directly sourced from verified sellers on BravoMart. Fast local dispatch with real-time GPS rider tracking enabled."}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                id="modal-add-to-cart-btn"
                name="modalAddToCartBtn"
                onClick={() => {
                  handleAddToCart(selectedProductModal);
                  setSelectedProductModal(null);
                }}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>
              
              <button 
                type="button"
                id="modal-buy-now-btn"
                name="modalBuyNowBtn"
                onClick={() => {
                  handleAddToCart(selectedProductModal);
                  setSelectedProductModal(null);
                  navigate('/checkout');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-md"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      )}

      {scamModalProduct && (
        <AiScamModal product={scamModalProduct} onClose={() => setScamModalProduct(null)} />
      )}

      <Footer setView={(view) => navigate(`/${view}`)} />
    </div>
  );
}