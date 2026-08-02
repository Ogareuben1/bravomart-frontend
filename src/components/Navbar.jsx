import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Globe, Sparkles, 
  Truck, ChevronDown, Headphones, HelpCircle, Info, ShieldAlert 
} from 'lucide-react';

export default function Navbar({ 
  activeVendor, 
  setActiveVendor, 
  pendingVendorsCount = 0, 
  cartCount = 0, 
  searchQuery, 
  setSearchQuery, 
  handleCategorySelect 
}) {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const helpDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-sky-100 shadow-sm">
      {/* TOP ANNOUNCEMENT & NAVIGATION BAR */}
      <div className="bg-sky-900 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Globe size={12} /> Global Shipping Available</span>
          <span className="hidden sm:inline">📍 Deliver to: <b>Lagos, Nigeria</b></span>
        </div>
        
        {/* PUSH ALL NAV ITEMS TO THE RIGHT */}
        <div className="ml-auto flex flex-wrap gap-2 md:gap-2.5 items-center">
          <button onClick={() => navigate("/")} className="bg-white/10 hover:bg-white/20 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer">
            🏠 Home
          </button>
          
          <button onClick={() => navigate("/AdminAiAssistant")} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer">
            <Sparkles size={12} /> AI Assistant
          </button>

          <button onClick={() => navigate("/BravoAdmin")} className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 shadow-sm cursor-pointer">
            <ShieldAlert size={12} /> BravoAdmin
          </button>

          {!activeVendor ? (
            <div className="flex items-center gap-1.5">
              <button onClick={() => navigate("/vendor_register")} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer">
                🏪 Sell on BravoMart
              </button>
              <button onClick={() => navigate("/vendor_login")} className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer">
                Vendor Log In
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => navigate("/vendor_register")} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer">
                🤖 Vendor Portal ({activeVendor.businessName || "Active"})
              </button>
              <button onClick={() => { setActiveVendor(null); navigate("/"); }} className="bg-red-500/20 hover:bg-red-500 text-red-100 border border-red-400 font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                Logout
              </button>
            </div>
          )}

          <button onClick={() => navigate("/BravoSuperAdmin")} className="bg-white/10 hover:bg-white/20 text-sky-100 px-2 py-1 rounded-md text-[11px] transition-colors hidden sm:block cursor-pointer">
            🛡️ Bravo Verification ({pendingVendorsCount})
          </button>

          <button onClick={() => navigate("/DispatcherPortal")} className="bg-amber-300 text-gray-900 font-bold px-2.5 py-1 rounded-full hover:bg-amber-400 cursor-pointer transition-colors flex items-center gap-1">
            <Truck size={12} /> Become Dispatcher
          </button>

          <button onClick={() => navigate("/about")} className="hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-0 text-white text-xs">
            <Info size={12} /> About Us
          </button>

          {/* HELP DROPDOWN */}
          <div className="relative" ref={helpDropdownRef}>
            <button onClick={() => setIsHelpOpen(!isHelpOpen)} className="hover:underline flex items-center gap-1 focus:outline-none cursor-pointer">
              <HelpCircle size={12} /> Help <ChevronDown size={12} className={`transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`} />
            </button>

            {isHelpOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white text-gray-800 rounded-xl shadow-xl border border-sky-100 py-1.5 z-50">
                {/* CUSTOMER SUPPORT ROUTE */}
                <button 
                  onClick={() => { 
                    setIsHelpOpen(false); 
                    navigate("/help?tab=support"); 
                  }} 
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  <Headphones size={14} className="text-sky-600" /> Customer Support
                </button>
                
                {/* FAQ ROUTE */}
                <button 
                  onClick={() => { 
                    setIsHelpOpen(false); 
                    navigate("/help?tab=faq"); 
                  }} 
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  <HelpCircle size={14} className="text-amber-500" /> FAQ Support
                </button>
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
    </header>
  );
}