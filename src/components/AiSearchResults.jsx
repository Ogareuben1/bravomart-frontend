import React from 'react';
import { 
  ShieldCheck, ShoppingCart, Star, Sparkles, MapPin, 
  TrendingUp, SearchX, ArrowUpDown 
} from 'lucide-react';

export default function AiSearchResults({ 
  searchQuery, 
  products, 
  onAddToCart, 
  onScanScam, 
  onQuickSearch 
}) {
  const query = searchQuery.trim().toLowerCase();

  if (!query) return null;

  // 1. AI Intelligent Ranking Engine
  const rankedProducts = products
    .map((product) => {
      const title = (product.title || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      const vendor = (product.vendorName || '').toLowerCase();
      const category = (product.category || '').toLowerCase();

      let matchScore = 0; // Relevance
      let matchType = 'none';

      if (title === query) {
        matchScore = 100;
        matchType = 'Exact Match';
      } else if (title.includes(query)) {
        matchScore = 80;
        matchType = 'Title Match';
      } else if (category.includes(query) || vendor.includes(query)) {
        matchScore = 60;
        matchType = 'Category/Vendor Match';
      } else if (description.includes(query)) {
        matchScore = 40;
        matchType = 'Description Match';
      }

      if (matchScore === 0) return null;

      // Quality Penalty / Boost (Items with low rating < 3.0 get severely penalized)
      const rating = product.rating || 4.0;
      const qualityMultiplier = rating >= 4.0 ? 1.3 : rating >= 3.0 ? 1.0 : 0.2;

      // Price Score (Normalized lower price preferred)
      const priceScore = 1000000 / (product.salePrice || 1);

      // Distance Score (Closer distance preferred)
      const distancePenalty = (product.distanceKm || 10) * 2;

      // Composite Smart Score
      const totalScore = (matchScore * qualityMultiplier * 10) + (priceScore * 0.1) - distancePenalty;

      return {
        ...product,
        matchScore,
        matchType,
        totalScore,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.totalScore - a.totalScore); // Sort best composite rank first

  // 2. Fallback Recommendations if No Direct Matches Found
  const popularSearches = [
    "Solar Inverters", "Yellow Garri", "Excavator CAT 320", 
    "Yam Tubers", "Fertilizer", "Lithium Battery"
  ];

  const peopleAlsoSearch = [
    "Diesel Generators", "Cold Room Storage", "Tractors", "Rice 50kg"
  ];

  const relatedProducts = products
    .filter((p) => p.rating >= 4.2)
    .slice(0, 3);

  const mostSearchedProducts = products
    .filter((p) => p.isFlashDrop || p.rating >= 4.5)
    .slice(0, 6);

  return (
    <div className="bg-gradient-to-b from-sky-50/50 to-white p-4 sm:p-6 rounded-3xl border-2 border-brandSky/30 shadow-md mb-8">
      
      {/* Search Header Banner */}
      <div className="flex items-center justify-between border-b border-sky-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-brandSky text-white p-2 rounded-xl shadow-sm">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-extrabold text-gray-900 text-base sm:text-lg flex items-center gap-2">
              AI Smart Search Scan Engine
            </h2>
            <p className="text-xs text-gray-500">
              Scanned app inventory • Ranked by Match, High Quality (4★+), Best Price & Location Proximity
            </p>
          </div>
        </div>

        <span className="text-xs font-bold bg-sky-100 text-brandSky-dark px-3 py-1 rounded-full flex items-center gap-1">
          <ArrowUpDown size={12} /> Ranked {rankedProducts.length} Results
        </span>
      </div>

      {/* CASE A: RESULTS FOUND */}
      {rankedProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rankedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-sky-100 hover:border-brandSky rounded-2xl p-3.5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group relative"
              >
                <div>
                  {/* Rank Badge & Image */}
                  <div className="relative h-44 w-full overflow-hidden rounded-xl mb-3 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Anti-Scam Trigger */}
                    <button 
                      onClick={() => onScanScam(product)}
                      className="absolute top-2 right-2 bg-white/95 hover:bg-white text-gray-900 text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-md flex items-center gap-1 border border-sky-200 hover:scale-105 transition-all"
                    >
                      <ShieldCheck size={12} className="text-emerald-600" /> AI Scam Scan
                    </button>

                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                      {product.matchType}
                    </span>
                  </div>

                  {/* Vendor, Distance & Rating */}
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-medium truncate max-w-[120px]">{product.vendorName}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={11} fill="currentColor" /> {product.rating || '4.5'}
                    </span>
                    <span className="text-gray-400">📍 {product.distanceKm} km</span>
                  </div>

                  <h3 className="font-bold text-xs text-gray-900 line-clamp-2 mb-2 group-hover:text-brandSky-dark transition-colors">
                    {product.title}
                  </h3>

                  {product.description && (
                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                      {product.description}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm font-black text-gray-900">
                      ₦{product.salePrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button 
                    onClick={() => onAddToCart()}
                    className="w-full bg-brandSky hover:bg-brandSky-dark text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PEOPLE ALSO SEARCH FOR */}
          <div className="mt-8 pt-6 border-t border-sky-100">
            <h4 className="font-bold text-xs text-gray-700 mb-3 flex items-center gap-1.5">
              <TrendingUp size={14} className="text-brandSky" /> People search for alongside "{searchQuery}":
            </h4>
            <div className="flex flex-wrap gap-2">
              {peopleAlsoSearch.map((term, i) => (
                <button
                  key={i}
                  onClick={() => onQuickSearch(term)}
                  className="bg-white border border-sky-200 hover:border-brandSky text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-sky-50 transition-all shadow-xs"
                >
                  🔍 {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (

        /* CASE B: NO MATCHES FOUND - ERROR & SUGGESTION BOARD */
        <div className="space-y-8">
          
          {/* Error Banner */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-2">
            <SearchX size={36} className="mx-auto text-red-500" />
            <h3 className="font-extrabold text-red-700 text-sm sm:text-base">
              No products found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-red-600 max-w-md mx-auto">
              Please broaden your search terms or phrases. Try searching for broader category keywords like <i>"Garri"</i>, <i>"Solar"</i>, or <i>"Excavator"</i>.
            </p>
          </div>

          {/* Frequent / Popular Searches */}
          <div>
            <h4 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> Frequent & Top Searched Terms:
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => onQuickSearch(term)}
                  className="bg-brandCream-light border border-amber-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-amber-300 transition-all"
                >
                  ⚡ {term}
                </button>
              ))}
            </div>
          </div>

          {/* Related High Quality Products */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-3">
              Recommended High Quality Products:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-white border rounded-xl p-3 flex gap-3 items-center shadow-xs">
                  <img src={p.image} alt={p.title} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-xs text-gray-900 truncate">{p.title}</h5>
                    <span className="text-xs font-extrabold text-brandSky-dark">₦{p.salePrice.toLocaleString()}</span>
                    <button 
                      onClick={() => onAddToCart()}
                      className="block text-[10px] font-bold text-brandSky hover:underline mt-1"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Searched Products Section */}
          <div className="border-t border-sky-100 pt-6">
            <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
              🔥 Most Searched Products on BravoMart
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {mostSearchedProducts.map((prod) => (
                <div key={prod.id} className="bg-white border rounded-xl p-2 text-center shadow-xs hover:border-brandSky transition-all">
                  <img src={prod.image} alt={prod.title} className="w-full h-20 object-cover rounded-lg mb-2" />
                  <h6 className="text-[11px] font-bold text-gray-800 line-clamp-1">{prod.title}</h6>
                  <span className="text-[11px] font-extrabold text-emerald-600">₦{prod.salePrice.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}