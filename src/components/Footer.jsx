import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="bg-brandSky text-white font-black text-xl px-3 py-1 rounded-xl inline-block mb-3">
            BRAVO<span className="text-amber-300">MART</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Africa's premier AI-powered smart commerce super app. Unifying local food markets, supermarkets, heavy equipment, real estate, and global logistics into one platform.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Marketplace Sectors</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-brandSky cursor-pointer">Local Farm & Food Market</li>
            <li className="hover:text-brandSky cursor-pointer">Heavy Industrial Machinery</li>
            <li className="hover:text-brandSky cursor-pointer">Real Estate & Properties</li>
            <li className="hover:text-brandSky cursor-pointer">Global Imports (China/Europe)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Vendor & Logistics</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-brandSky cursor-pointer">Register Your Shop (1-Year Free)</li>
            <li className="hover:text-brandSky cursor-pointer">Become a Bravo Dispatch Rider</li>
            <li className="hover:text-brandSky cursor-pointer">Escrow & Return Policy (7 Days)</li>
            <li className="hover:text-brandSky cursor-pointer">API Integration for Sellers</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 text-sm">Customer Care</h4>
          <p className="text-gray-400 mb-2">24/7 AI Resolution Center & Support</p>
          <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
            <span className="block text-[10px] text-gray-400">Escrow Support Hotline</span>
            <strong className="text-brandSky font-bold text-sm">+234 800 BRAVO MART</strong>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 py-4 text-center text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} BravoMart Super App Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
}