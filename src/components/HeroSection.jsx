import React from 'react';
import { Flame, ShoppingCart } from 'lucide-react';

export default function HeroSection({ 
  flashDrops, 
  flashDropSlideIndex, 
  setFlashDropSlideIndex, 
  onAddToCart 
}) {
  const activeFlashItem = flashDrops[flashDropSlideIndex] || flashDrops[0];

  if (!flashDrops || flashDrops.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-5 rounded-2xl border border-sky-800/50 shadow-xl relative overflow-hidden text-white">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Flame className="text-amber-400 fill-amber-400 animate-bounce" size={22} />
          <h2 className="font-black text-white text-base md:text-lg tracking-wide">
            FLASH PRICE DROPS
          </h2>
        </div>
        <span className="bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full animate-pulse shadow-lg flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Live Rotating Deals
        </span>
      </div>

      {activeFlashItem && (
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center transition-all duration-500">
          <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800">
            <img 
              src={activeFlashItem.image} 
              alt={activeFlashItem.title} 
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
            />
            <span className="absolute top-1 left-1 bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded">
              HOT DROP
            </span>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
            <span className="text-[10px] font-bold tracking-wider text-sky-300 uppercase">
              {activeFlashItem.category.replace('_', ' ')} • {activeFlashItem.vendorName}
            </span>
            <h4 className="font-bold text-sm truncate text-white">{activeFlashItem.title}</h4>
            
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="text-amber-300 font-black text-lg">
                ₦{activeFlashItem.salePrice.toLocaleString()}
              </span>
              <span className="text-slate-400 line-through text-xs font-semibold">
                ₦{activeFlashItem.originalPrice.toLocaleString()}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                Save ₦{(activeFlashItem.originalPrice - activeFlashItem.salePrice).toLocaleString()}
              </span>
            </div>

            <button 
              onClick={() => onAddToCart(activeFlashItem)}
              className="mt-2 w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
            >
              <ShoppingCart size={14} /> Claim Flash Deal
            </button>
          </div>
        </div>
      )}

      {/* Dots navigation */}
      <div className="flex justify-center items-center gap-1.5 mt-3 relative z-10">
        {flashDrops.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setFlashDropSlideIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              flashDropSlideIndex === idx ? "w-6 bg-amber-400" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}