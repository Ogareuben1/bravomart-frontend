import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer({ onSelectCategory }) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* BRAND INFO */}
        <div>
          <div 
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-sky-600 text-white font-black text-xl px-3 py-1 rounded-xl inline-block mb-3 cursor-pointer select-none"
          >
            BRAVO<span className="text-amber-300">MART</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Africa's premier AI-powered smart commerce super app. Unifying local food markets, supermarkets, heavy equipment, real estate, and global logistics into one platform.
          </p>
        </div>

        {/* MARKETPLACE SECTORS */}
        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Marketplace Sectors</h4>
          <ul className="space-y-2 text-gray-400">
            <li 
              onClick={() => handleCategoryClick('food_farm')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Local Farm & Food Market
            </li>
            <li 
              onClick={() => handleCategoryClick('machinery')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Heavy Industrial Machinery
            </li>
            <li 
              onClick={() => handleCategoryClick('real_estate')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Real Estate & Properties
            </li>
            <li 
              onClick={() => handleCategoryClick('global_imports')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Global Imports (China/Europe)
            </li>
          </ul>
        </div>

        {/* VENDOR & LOGISTICS */}
        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Vendor & Logistics</h4>
          <ul className="space-y-2 text-gray-400">
            <li 
              onClick={() => navigate('/vendor_register')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Register Your Shop (1-Year Free)
            </li>
            <li 
              onClick={() => navigate('/DispatcherPortal')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Become a Bravo Dispatch Rider
            </li>
            <li 
              onClick={() => navigate('/help')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              Escrow & Return Policy (7 Days)
            </li>
            <li 
              onClick={() => navigate('/AdminAiAssistant')} 
              className="hover:text-sky-400 cursor-pointer transition-colors"
            >
              API Integration for Sellers
            </li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Customer Care</h4>
          <p className="text-gray-400 mb-2">24/7 AI Resolution Center & Support</p>
          
          <div 
            onClick={() => navigate('/help')} 
            className="bg-gray-800 hover:bg-gray-750 p-3 rounded-xl border border-gray-700 cursor-pointer transition-colors"
          >
            <span className="block text-[10px] text-gray-400">Escrow Support Hotline</span>
            <strong className="text-sky-400 font-bold text-sm">+234 800 BRAVO MART</strong>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="bg-gray-950 py-4 text-center text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} BravoMart Super App Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
}