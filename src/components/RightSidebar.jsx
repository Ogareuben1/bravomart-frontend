import React from 'react';
import { Sparkles, TrendingDown, Users, CheckCircle2 } from 'lucide-react';

export default function RightSidebar({ 
  products, 
  activeSlideIndex, 
  setActiveSlideIndex, 
  onAddToCart 
}) {
  const activeSlideProduct = products[activeSlideIndex] || products[0];

  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-6">
      
      {/* New Arrivals Auto Slideshow */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1">
            <Sparkles size={14} className="text-amber-500" /> New Arrivals
          </h3>
          <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            Featured
          </span>
        </div>

        {activeSlideProduct && (
          <div className="space-y-2">
            <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
              <img 
                src={activeSlideProduct.image} 
                alt={activeSlideProduct.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-white text-xs font-bold truncate pr-2">
                {activeSlideProduct.title}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-black text-gray-900">
                ₦{activeSlideProduct.salePrice.toLocaleString()}
              </span>
              <button 
                onClick={() => onAddToCart(activeSlideProduct)}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                View Item
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center gap-1 mt-3">
          {products.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeSlideIndex === idx ? "w-4 bg-sky-600" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* AI Commodity Price Monitor */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm space-y-3">
        <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 border-b pb-2">
          <TrendingDown size={16} className="text-emerald-600" /> Price Index Monitor
        </h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">Ijebu Garri (50kg)</p>
              <p className="text-[10px] text-gray-500">Lagos Main Market</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">₦48,500</p>
              <span className="text-[10px] font-bold text-emerald-600">↓ -2.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">5kVA Solar Inverter</p>
              <p className="text-[10px] text-gray-500">Alaba International</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">₦320,000</p>
              <span className="text-[10px] font-bold text-emerald-600">↓ -5.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Verified Sellers */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm space-y-3">
        <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 border-b pb-2">
          <Users size={16} className="text-sky-600" /> Top Verified Merchants
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center font-bold text-[10px]">
                BM
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[11px]">Bello Agro & Foods</p>
                <p className="text-[10px] text-gray-400">98% Positive Feedback</p>
              </div>
            </div>
            <CheckCircle2 size={14} className="text-sky-600" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-[10px]">
                SE
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[11px]">Solar Power Direct</p>
                <p className="text-[10px] text-gray-400">100% Escrow Rating</p>
              </div>
            </div>
            <CheckCircle2 size={14} className="text-sky-600" />
          </div>
        </div>
      </div>

    </aside>
  );
}