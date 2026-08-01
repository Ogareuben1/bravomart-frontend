import React from 'react';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product, calculateGpsDistanceKm, onAddToCart, onScanScam }) {
  const distance = product.coords 
    ? calculateGpsDistanceKm(product.coords.lat, product.coords.lng) 
    : (product.distanceKm || 2.1);

  return (
    <div className="bg-white border border-sky-100 hover:border-sky-400 rounded-2xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group relative">
      <div>
        <div className="relative h-40 w-full overflow-hidden rounded-xl mb-3 bg-gray-100">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <button 
            onClick={() => onScanScam(product)}
            className="absolute top-2 right-2 bg-white/95 hover:bg-white text-gray-900 text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-md flex items-center gap-1 border border-sky-200 hover:scale-105 transition-all cursor-pointer"
          >
            <ShieldCheck size={12} className="text-emerald-600" /> AI Scam Scan
          </button>

          <span className="absolute top-2 left-2 bg-sky-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            {product.category.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
          <span className="font-medium truncate max-w-[110px]">{product.vendorName}</span>
          <span className="text-gray-400">📍 {distance} km</span>
        </div>

        <h3 className="font-bold text-xs text-gray-900 line-clamp-2 mb-2 group-hover:text-sky-700 transition-colors">
          {product.title}
        </h3>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm font-black text-gray-900">
            ₦{product.salePrice.toLocaleString()}
          </span>
          {product.originalPrice > product.salePrice && (
            <span className="text-xs text-gray-400 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        >
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
}