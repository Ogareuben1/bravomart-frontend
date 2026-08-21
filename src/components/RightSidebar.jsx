import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingDown, 
  Users, 
  CheckCircle2, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Zap, 
  ShieldCheck,
  X,
  MapPin,
  Star,
  Store,
  Package
} from 'lucide-react';

// Mock detailed data for featured merchants
const VERIFIED_MERCHANTS = [
  {
    id: 'm1',
    name: 'Bello Agro & Foods',
    category: 'Agricultural Produce',
    rating: 4.9,
    reviewsCount: 312,
    location: 'Mile 12 Market, Lagos',
    feedbackRate: '98%',
    escrowRating: '100%',
    verifiedSince: '2022',
    icon: Building2,
    colorScheme: 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    description: 'Direct farm supplier specializing in grains, tubers, and bulk foodstuff across West Africa with guaranteed fresh delivery.',
    products: [
      { id: 'p1', title: 'Ijebu Garri (50kg Bag)', price: 48500, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
      { id: 'p2', title: 'Royal Stallion Rice (50kg)', price: 72000, img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=300&q=80' },
      { id: 'p3', title: 'Refined Palm Oil (25 Liters)', price: 34000, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 'm2',
    name: 'Solar Power Direct',
    category: 'Renewable Energy',
    rating: 5.0,
    reviewsCount: 184,
    location: 'Alaba Int. Market, Lagos',
    feedbackRate: '100%',
    escrowRating: '100%',
    verifiedSince: '2023',
    icon: Zap,
    colorScheme: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    description: 'Certified distributor of Tier-1 solar panels, hybrid inverters, and lithium battery storage systems with warranty.',
    products: [
      { id: 'p4', title: '5kVA Pure Sine Inverter', price: 320000, img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=300&q=80' },
      { id: 'p5', title: '550W Monocrystalline Panel', price: 85000, img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=300&q=80' }
    ]
  }
];

export default function RightSidebar({ 
  products = [], 
  activeSlideIndex = 0, 
  setActiveSlideIndex, 
  onAddToCart 
}) {
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const activeSlideProduct = products[activeSlideIndex] || products[0];

  const handlePrevSlide = () => {
    if (!setActiveSlideIndex) return;
    setActiveSlideIndex(activeSlideIndex === 0 ? Math.min(products.length - 1, 4) : activeSlideIndex - 1);
  };

  const handleNextSlide = () => {
    if (!setActiveSlideIndex) return;
    const maxIdx = Math.min(products.length - 1, 4);
    setActiveSlideIndex(activeSlideIndex >= maxIdx ? 0 : activeSlideIndex + 1);
  };

  return (
    <>
      <aside className="space-y-5">
        
        {/* Featured / New Arrivals Auto Slideshow */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-sky-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" /> New Arrivals
            </h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="p-1 rounded-md text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="p-1 rounded-md text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {activeSlideProduct && (
            <div className="space-y-2">
              <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 group">
                <img 
                  src={activeSlideProduct.image || activeSlideProduct.imgUrl} 
                  alt={activeSlideProduct.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-white text-xs font-bold truncate pr-2 max-w-[90%]">
                  {activeSlideProduct.title}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                  ₦{(activeSlideProduct.salePrice || activeSlideProduct.price || 0).toLocaleString()}
                </span>
                <button 
                  type="button"
                  onClick={() => onAddToCart && onAddToCart(activeSlideProduct)}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <ShoppingCart size={13} />
                  <span>View Item</span>
                </button>
              </div>
            </div>
          )}

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-1 mt-3">
            {products.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlideIndex && setActiveSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeSlideIndex === idx ? "w-4 bg-sky-600 dark:bg-sky-400" : "w-1.5 bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* AI Commodity Price Monitor */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-sky-100 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
          <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <TrendingDown size={16} className="text-emerald-600 dark:text-emerald-400" /> 
            Price Index Monitor
          </h3>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Ijebu Garri (50kg)</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Lagos Main Market</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-slate-100">₦48,500</p>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                  <TrendingDown size={10} /> -2.4%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">5kVA Solar Inverter</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Alaba International</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-slate-100">₦320,000</p>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                  <TrendingDown size={10} /> -5.0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Verified Merchants (Clickable) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-sky-100 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
          <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Users size={16} className="text-sky-600 dark:text-sky-400" /> 
            Top Verified Merchants
          </h3>

          <div className="space-y-2 text-xs">
            {VERIFIED_MERCHANTS.map((merchant) => {
              const IconComponent = merchant.icon;
              return (
                <button
                  key={merchant.id}
                  type="button"
                  onClick={() => setSelectedMerchant(merchant)}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer group text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 border ${merchant.colorScheme}`}>
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {merchant.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <ShieldCheck size={10} className="text-emerald-500" /> {merchant.feedbackRate} Feedback
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 size={16} className="text-sky-600 dark:text-sky-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

      </aside>

      {/* MERCHANT STORE MODAL */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMerchant(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Merchant Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm shrink-0 ${selectedMerchant.colorScheme}`}>
                {React.createElement(selectedMerchant.icon, { size: 28 })}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl">{selectedMerchant.name}</h3>
                  <CheckCircle2 size={18} className="text-sky-600 dark:text-sky-400" />
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Store size={14} className="text-sky-500" /> {selectedMerchant.category}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin size={14} className="text-emerald-500" /> {selectedMerchant.location}
                </p>
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-center mb-5 text-xs">
              <div>
                <p className="text-slate-400 text-[10px] font-semibold">Rating</p>
                <p className="font-extrabold text-amber-500 flex items-center justify-center gap-0.5 mt-0.5">
                  <Star size={12} className="fill-amber-500" /> {selectedMerchant.rating} ({selectedMerchant.reviewsCount})
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-[10px] font-semibold">Positive Feedback</p>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedMerchant.feedbackRate}</p>
              </div>

              <div>
                <p className="text-slate-400 text-[10px] font-semibold">Escrow Verified</p>
                <p className="font-extrabold text-sky-600 dark:text-sky-400 flex items-center justify-center gap-0.5 mt-0.5">
                  <ShieldCheck size={12} /> {selectedMerchant.escrowRating}
                </p>
              </div>
            </div>

            {/* Merchant Bio */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {selectedMerchant.description}
            </p>

            {/* Featured Store Products */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Package size={16} className="text-sky-600 dark:text-sky-400" /> Featured Inventory
              </h4>

              <div className="space-y-2">
                {selectedMerchant.products.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-10 h-10 object-cover rounded-lg bg-slate-200"
                      />
                      <div>
                        <p className="font-bold text-xs">{item.title}</p>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onAddToCart) onAddToCart({ title: item.title, salePrice: item.price, image: item.img });
                        setSelectedMerchant(null);
                      }}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <ShoppingCart size={12} /> Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}