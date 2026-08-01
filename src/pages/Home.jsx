import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Data imports
import { CATEGORIES, PRODUCTS } from '../data/mockData';

// Custom Application Components
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
  Search, ShoppingCart, User, ShieldCheck, 
  Truck, Globe, Sparkles, DollarSign, MapPin, 
  Award, ChevronDown, Headphones, HelpCircle, 
  Info, ShieldAlert
} from 'lucide-react';

const calculateGpsDistanceKm = (lat, lng) => {
  if (!lat || !lng) return 2.5;
  return Math.round((Math.abs(lat) % 10 + Math.abs(lng) % 10) * 10) / 10;
};

export default function Home({ 
  activeVendor, 
  setActiveVendor, 
  pendingVendorsCount = 0,
  cartItems = [],
  setCartItems
}) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartCount, setCartCount] = useState(cartItems.length || 0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [flashDropSlideIndex, setFlashDropSlideIndex] = useState(0);

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const helpDropdownRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [aiFilter, setAiFilter] = useState("none"); 
  const [scamModalProduct, setScamModalProduct] = useState(null);

  const [orderTrackingId, setOrderTrackingId] = useState("");
  const [isLiveTracking, setIsLiveTracking] = useState(false);

  useEffect(() => {
    if (cartItems) setCartCount(cartItems.length);
  }, [cartItems]);

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
  };

  const handleTrackOrder = () => {
    if (orderTrackingId.trim()) {
      setIsLiveTracking(true);
    } else {
      alert("Please enter a valid order tracking ID (e.g., BM-9041).");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!PRODUCTS || PRODUCTS.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const flashDrops = PRODUCTS ? PRODUCTS.filter((p) => p.isFlashDrop || p.salePrice < p.originalPrice) : [];
  useEffect(() => {
    if (flashDrops.length === 0) return;
    const flashTimer = setInterval(() => {
      setFlashDropSlideIndex((prev) => (prev + 1) % flashDrops.length);
    }, 3500);
    return () => clearInterval(flashTimer);
  }, [flashDrops.length]);

  let processedProducts = (PRODUCTS || []).filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
                          product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
                          
    return matchesCategory && matchesSearch;
  });

  if (aiFilter === "cheapest") {
    processedProducts.sort((a, b) => a.salePrice - b.salePrice);
  } else if (aiFilter === "nearest") {
    processedProducts.sort((a, b) => {
      const distA = a.coords ? calculateGpsDistanceKm(a.coords.lat, a.coords.lng) : (a.distanceKm || 0);
      const distB = b.coords ? calculateGpsDistanceKm(b.coords.lat, b.coords.lng) : (b.distanceKm || 0);
      return distA - distB;
    });
  } else if (aiFilter === "quality") {
    processedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-sky-100 shadow-sm">
        <div className="bg-sky-900 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Globe size={12} /> Global Shipping Available</span>
            <span>📍 Deliver to: <b>Lagos, Nigeria</b></span>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
            <button onClick={() => navigate("/")} className="bg-white/10 hover:bg-white/20 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer">🏠 Home</button>
            <button onClick={() => navigate("/AdminAiAssistant")} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"><Sparkles size={12} /> AI Assistant</button>
            <button onClick={() => navigate("/BravoAdmin")} className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 shadow-sm cursor-pointer"><ShieldAlert size={12} /> BravoAdmin</button>

            {!activeVendor ? (
              <div className="flex items-center gap-1.5">
                <button onClick={() => navigate("/vendor_register")} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer">🏪 Sell on BravoMart</button>
                <button onClick={() => navigate("/vendor_login")} className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer">Vendor Log In</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/vendor_register")} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer">🤖 Vendor Portal ({activeVendor.businessName || "Active"})</button>
                <button onClick={() => { setActiveVendor(null); navigate("/"); }} className="bg-red-500/20 hover:bg-red-500 text-red-100 border border-red-400 font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer">Logout</button>
              </div>
            )}

            <button onClick={() => navigate("/BravoSuperAdmin")} className="bg-white/10 hover:bg-white/20 text-sky-100 px-2 py-1 rounded-md text-[11px] transition-colors hidden sm:block cursor-pointer">🛡️ Bravo Verification ({pendingVendorsCount})</button>
            <button onClick={() => navigate("/DispatcherPortal")} className="bg-amber-300 text-gray-900 font-bold px-2.5 py-1 rounded-full hover:bg-amber-400 cursor-pointer transition-colors flex items-center gap-1"><Truck size={12} /> Become Dispatcher</button>
            <button onClick={() => navigate("/about")} className="hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-0 text-white"><Info size={12} /> About Us</button>

            <div className="relative" ref={helpDropdownRef}>
              <button onClick={() => setIsHelpOpen(!isHelpOpen)} className="hover:underline flex items-center gap-1 focus:outline-none cursor-pointer">
                <HelpCircle size={12} /> Help <ChevronDown size={12} className={`transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`} />
              </button>

              {isHelpOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white text-gray-800 rounded-xl shadow-xl border border-sky-100 py-1.5 z-50">
                  <button onClick={() => { setIsHelpOpen(false); navigate("/help"); }} className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer"><Headphones size={14} className="text-sky-600" /> Customer Support</button>
                  <button onClick={() => { setIsHelpOpen(false); navigate("/help"); }} className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer"><HelpCircle size={14} className="text-amber-500" /> FAQ & Support</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEARCH BAR & BRANDING */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex flex-col cursor-pointer select-none" onClick={() => handleCategorySelect("all")}>
            <div className="bg-sky-600 text-white font-black text-xl md:text-2xl px-3 py-0.5 rounded-xl shadow-md tracking-wider flex items-center gap-1">
              BRAVO<span className="text-amber-300">MART</span>
            </div>
            <span className="text-[10px] italic font-semibold text-sky-900 tracking-tight mt-0.5 pl-1">shop smarter , saving cost</span>
          </div>

          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Garri, Yam, Excavators, Solar Inverters..."
              className="w-full bg-slate-100 border-2 border-sky-200 focus:border-sky-600 rounded-full py-2 pl-10 pr-28 text-sm focus:outline-none transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <button 
              onClick={() => { if (!searchQuery.trim()) setSearchQuery("Solar Inverters"); }}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-full transition-colors flex items-center gap-1 text-xs font-bold px-3 shadow-sm cursor-pointer"
            >
              <Sparkles size={14} /> AI Search
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div onClick={() => navigate("/account")} className="flex items-center gap-2 cursor-pointer hover:text-sky-700 transition-colors">
              <User size={22} className="text-sky-800" />
              <div className="text-xs hidden sm:block">
                <span className="block text-gray-500">Welcome</span>
                <span className="font-bold">Account / Login</span>
              </div>
            </div>

            <div onClick={() => navigate("/checkout")} className="relative cursor-pointer group">
              <div className="bg-sky-100 group-hover:bg-sky-200 p-2 rounded-full text-sky-900 transition-colors">
                <ShoppingCart size={22} />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CATEGORY NAV */}
        <nav className="bg-sky-50 border-t border-sky-100 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6 py-2 text-xs font-semibold whitespace-nowrap">
            {(CATEGORIES || []).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat.id ? "bg-sky-600 text-white shadow-sm" : "text-gray-700 hover:bg-sky-200/50"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <MarketSectors categories={CATEGORIES || []} onSelectCategory={handleCategorySelect} />

          <OrderTracker 
            orderTrackingId={orderTrackingId} 
            setOrderTrackingId={setOrderTrackingId} 
            isLiveTracking={isLiveTracking} 
            onTrackOrder={handleTrackOrder} 
          />

          <div className="bg-gradient-to-br from-sky-800 to-sky-600 text-white rounded-2xl p-4 text-xs shadow-md">
            <ShieldCheck size={28} className="text-amber-300 mb-2" />
            <h4 className="font-bold text-sm mb-1">Escrow Protected</h4>
            <p className="text-sky-100 leading-relaxed">
              Funds are held safely in escrow for 7 days until you confirm receiving your exact product.
            </p>
          </div>
        </aside>

        {/* CENTER COLUMN */}
        <main className="lg:col-span-6 space-y-6">
          {searchQuery.trim() !== "" && (
            <AiSearchResults 
              searchQuery={searchQuery}
              products={PRODUCTS || []}
              onAddToCart={handleAddToCart}
              onScanScam={(p) => setScamModalProduct(p)}
              onQuickSearch={(term) => setSearchQuery(term)}
            />
          )}

          {/* ROTATING HERO BANNER */}
          <HeroSection 
            flashDrops={flashDrops}
            flashDropSlideIndex={flashDropSlideIndex}
            setFlashDropSlideIndex={setFlashDropSlideIndex}
            onAddToCart={handleAddToCart}
          />

          {/* AI QUICK FILTERS */}
          <section className="bg-white border border-sky-100 p-4 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Sparkles size={16} className="text-sky-600" /> AI Smart Search Assist
              </h3>
              <span className="text-xs text-gray-500">Filter results intelligently:</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button 
                onClick={() => setAiFilter(aiFilter === "cheapest" ? "none" : "cheapest")}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                  aiFilter === "cheapest" ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <DollarSign size={14} /> Cheapest Price
              </button>

              <button 
                onClick={() => setAiFilter(aiFilter === "nearest" ? "none" : "nearest")}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                  aiFilter === "nearest" ? "bg-sky-700 text-white border-sky-700 shadow-sm" : "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100"
                }`}
              >
                <MapPin size={14} /> Nearest to You
              </button>

              <button 
                onClick={() => setAiFilter(aiFilter === "quality" ? "none" : "quality")}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                  aiFilter === "quality" ? "bg-amber-500 text-white border-amber-500 shadow-sm" : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <Award size={14} /> Best Quality
              </button>
            </div>
          </section>

          {/* PRODUCT GRID */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">🛒 Global & Local Marketplace</h2>
              <span className="text-xs text-gray-500">Showing {processedProducts.length} items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {processedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  calculateGpsDistanceKm={calculateGpsDistanceKm} 
                  onAddToCart={handleAddToCart}
                  onScanScam={(p) => setScamModalProduct(p)}
                />
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT COLUMN */}
        <RightSidebar 
          products={PRODUCTS || []} 
          activeSlideIndex={activeSlideIndex} 
          setActiveSlideIndex={setActiveSlideIndex}
          onAddToCart={handleAddToCart}
        />

      </div>

      {scamModalProduct && (
        <AiScamModal product={scamModalProduct} onClose={() => setScamModalProduct(null)} />
      )}

      <Footer setView={(view) => navigate(`/${view}`)} />
    </div>
  );
}