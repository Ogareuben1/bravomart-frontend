import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  ShieldCheck, Sparkles, DollarSign, MapPin, Award, X, ShoppingCart, CheckCircle2 
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

  const [searchQuery, setSearchQuery] = useState("");
  const [aiFilter, setAiFilter] = useState("none"); 
  const [scamModalProduct, setScamModalProduct] = useState(null);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

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
                          (product.vendorName && product.vendorName.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    return matchesCategory && matchesSearch;
  });

  if (aiFilter === "cheapest") {
    processedProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
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
      
      {/* EXTRACTED NAVBAR COMPONENT */}
      <Navbar
        activeVendor={activeVendor}
        setActiveVendor={setActiveVendor}
        pendingVendorsCount={pendingVendorsCount}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleCategorySelect={handleCategorySelect}
      />

      {/* CATEGORY BAR */}
      <nav className="bg-sky-50 border-b border-sky-100 overflow-x-auto sticky top-[105px] z-30">
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

      {/* MAIN THREE-COLUMN LAYOUT WITH FIXED SIDEBARS */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* FIXED LEFT SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">
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

        {/* SCROLLABLE CENTER MARKETPLACE AREA */}
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

          {/* UPGRADED 3-COLUMN PRODUCT GRID */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">🛒 Global & Local Marketplace</h2>
              <span className="text-xs text-gray-500">Showing {processedProducts.length} items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {processedProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProductModal(product)} 
                  className="cursor-pointer transition-transform hover:-translate-y-1"
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

        {/* FIXED RIGHT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pl-1">
          <RightSidebar 
            products={PRODUCTS || []} 
            activeSlideIndex={activeSlideIndex} 
            setActiveSlideIndex={setActiveSlideIndex}
            onAddToCart={handleAddToCart}
          />
        </div>

      </div>

      {/* FULL PRODUCT DETAILS MODAL */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col sm:flex-row gap-5">
              <img 
                src={selectedProductModal.image || selectedProductModal.imgUrl || 'https://via.placeholder.com/200'} 
                alt={selectedProductModal.title}
                className="w-full sm:w-48 h-48 object-cover rounded-xl border border-slate-100"
              />

              <div className="space-y-3 flex-1">
                <span className="bg-sky-100 text-sky-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  {selectedProductModal.category || "General"}
                </span>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedProductModal.title}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-emerald-600">
                    ₦{(selectedProductModal.salePrice || selectedProductModal.price || 0).toLocaleString()}
                  </span>
                  {selectedProductModal.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₦{selectedProductModal.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong className="text-slate-800">Vendor:</strong> {selectedProductModal.vendorName || "Verified Merchant"}</p>
                  <p className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 size={14} /> Escrow Protection Available
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900">Product Description</h4>
              <p className="leading-relaxed">
                {selectedProductModal.description || "High-quality item directly sourced from verified sellers on BravoMart. Fast local dispatch with real-time GPS rider tracking enabled."}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => {
                  handleAddToCart(selectedProductModal);
                  setSelectedProductModal(null);
                }}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              
              <button 
                onClick={() => {
                  handleAddToCart(selectedProductModal);
                  setSelectedProductModal(null);
                  navigate('/checkout');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SCAM INSPECTOR MODAL */}
      {scamModalProduct && (
        <AiScamModal product={scamModalProduct} onClose={() => setScamModalProduct(null)} />
      )}

      <Footer setView={(view) => navigate(`/${view}`)} />
    </div>
  );
}