import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Globe, Sparkles, 
  Truck, ChevronDown, Headphones, HelpCircle, Info, ShieldAlert, Menu, X 
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const helpDropdownRef = useRef(null);

  // Close Help Dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHelpNavigation = (tab) => {
    setIsHelpOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/help?tab=${tab}`);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery?.trim()) {
      if (setSearchQuery) setSearchQuery("Solar Inverters");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sky-100 shadow-sm">
      {/* TOP ANNOUNCEMENT & UTILITY NAVIGATION BAR */}
      <div className="bg-sky-900 text-white py-2 px-4 flex items-center justify-between gap-2 text-sm font-medium relative z-50">
        
        {/* LEFT LOCATION INFO */}
        <div className="flex flex-col shrink-0 font-semibold text-xs leading-tight">
          <span className="flex items-center gap-1">
            <Globe size={13} /> Global Shipping Available📍
          </span>
          <span className="text-[11px] text-sky-200 pl-4">
            Deliver to: <b className="text-amber-300">Lagos, Nigeria</b>
          </span>
        </div>
        
        {/* DESKTOP NAV LINKS (VISIBLE ON XL SCREENS TO PREVENT OVERFLOW) */}
        <div className="hidden xl:flex items-center gap-1.5 flex-wrap justify-end ml-auto">
          
          <button 
            type="button"
            onClick={() => navigate("/")} 
            className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs shrink-0"
          >
            🏠 Home
          </button>
          
          <button 
            type="button"
            onClick={() => navigate("/AdminAiAssistant")} 
            className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs shrink-0"
          >
            <Sparkles size={14} /> AI Assistant
          </button>

          {!activeVendor ? (
            <button 
              type="button"
              onClick={() => navigate("/vendor_register")} 
              className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs shrink-0"
            >
              🏪 Sell on BravoMart
            </button>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0">
              <button 
                type="button"
                onClick={() => navigate("/vendor_register")} 
                className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all cursor-pointer text-xs"
              >
                🤖 Vendor Portal ({activeVendor.businessName || "Active"})
              </button>
              <button 
                type="button"
                onClick={() => { setActiveVendor(null); navigate("/"); }} 
                className="bg-red-600/90 hover:bg-red-600 text-white font-bold px-2 py-1 rounded-lg transition-all cursor-pointer text-xs"
              >
                Logout
              </button>
            </div>
          )}

          <button 
            type="button"
            onClick={() => navigate("/DispatcherPortal")} 
            className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs shrink-0"
          >
            <Truck size={14} /> Dispatcher
          </button>

          <button 
            type="button"
            onClick={() => navigate("/about")} 
            className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs shrink-0"
          >
            <Info size={14} /> About
          </button>

          {/* HELP DROPDOWN CONTAINER (FIXED Z-INDEX AND RELATIVE SCOPE) */}
          <div className="relative inline-block text-left shrink-0 z-50" ref={helpDropdownRef}>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsHelpOpen((prev) => !prev);
              }} 
              className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs"
            >
              <HelpCircle size={14} /> Help <ChevronDown size={13} className={`transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`} />
            </button>

            {isHelpOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white text-gray-800 rounded-xl shadow-2xl border border-sky-100 py-1.5 z-[100] divide-y divide-gray-100">
                <button 
                  type="button"
                  onClick={() => handleHelpNavigation('support')} 
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer text-slate-800"
                >
                  <Headphones size={15} className="text-sky-600 shrink-0" /> Customer Support
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleHelpNavigation('faq')} 
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer text-slate-800"
                >
                  <HelpCircle size={15} className="text-amber-500 shrink-0" /> FAQ & Support
                </button>
              </div>
            )}
          </div>

          {!activeVendor && (
            <button 
              type="button"
              onClick={() => navigate("/vendor_login")} 
              className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all cursor-pointer text-xs shrink-0"
            >
              Vendor Log In
            </button>
          )}

          <button 
            type="button"
            onClick={() => navigate("/BravoAdmin")} 
            className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all flex items-center gap-1 cursor-pointer text-xs shrink-0"
          >
            <ShieldAlert size={14} /> BravoAdmin
          </button>

          <button 
            type="button"
            onClick={() => navigate("/BravoSuperAdmin")} 
            className="bg-sky-800/80 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-lg border border-sky-700/80 transition-all cursor-pointer text-xs shrink-0"
          >
            🛡️ Verification ({pendingVendorsCount})
          </button>

        </div>

        {/* MOBILE & TABLET MENU TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden text-white bg-sky-800 hover:bg-sky-700 p-1.5 rounded-lg border border-sky-700 flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ml-auto"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Menu</span>
        </button>
      </div>

      {/* SEARCH BAR & BRANDING ROW */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-4">
        
        {/* BRANDING LOGO */}
        <div 
          className="flex flex-col cursor-pointer select-none shrink-0" 
          onClick={() => {
            if (handleCategorySelect) handleCategorySelect("all");
            navigate("/");
          }}
        >
          <div className="bg-sky-600 text-white font-black text-xl md:text-2xl px-3.5 py-1 rounded-xl shadow-md tracking-wider flex items-center gap-1">
            BRAVO<span className="text-amber-300">MART</span>
          </div>
          <span className="text-[11px] italic font-bold text-sky-900 tracking-tight mt-0.5 pl-1">
            shop smarter , saving cost
          </span>
        </div>

        {/* SEARCH INPUT FORM */}
        <form 
          onSubmit={handleSearchSubmit}
          className="order-3 md:order-2 w-full md:flex-1 max-w-2xl relative mt-1 md:mt-0"
        >
          <input
            type="text"
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search Garri, Yam, Excavators, Solar Inverters..."
            className="w-full bg-slate-100 border-2 border-sky-200 focus:border-sky-600 rounded-full py-2.5 pl-11 pr-32 text-base focus:outline-none transition-all"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <button 
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-full transition-colors flex items-center gap-1.5 text-xs font-bold px-3.5 shadow-sm cursor-pointer"
          >
            <Sparkles size={15} /> AI Search
          </button>
        </form>

        {/* ACCOUNT & CART ACTION ICONS */}
        <div className="order-2 md:order-3 flex items-center gap-4 sm:gap-6 ml-auto md:ml-0 shrink-0">
          <div 
            onClick={() => navigate("/account")} 
            className="flex items-center gap-2 cursor-pointer hover:text-sky-700 transition-colors"
          >
            <User size={24} className="text-sky-800" />
            <div className="text-xs hidden sm:block">
              <span className="block text-gray-500 font-medium">Welcome</span>
              <span className="font-bold text-sm">Account / Login</span>
            </div>
          </div>

          <div 
            onClick={() => navigate("/checkout")} 
            className="relative cursor-pointer group"
          >
            <div className="bg-sky-100 group-hover:bg-sky-200 p-2.5 rounded-full text-sky-900 transition-colors">
              <ShoppingCart size={24} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-sky-900 border-t border-sky-800 p-4 text-white space-y-3 relative z-50">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button 
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); navigate("/"); }}
              className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-left flex items-center gap-2"
            >
              🏠 Home
            </button>
            <button 
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); navigate("/AdminAiAssistant"); }}
              className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-left flex items-center gap-2"
            >
              <Sparkles size={16} /> AI Assistant
            </button>
            <button 
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); navigate("/DispatcherPortal"); }}
              className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-left flex items-center gap-2"
            >
              <Truck size={16} /> Dispatcher
            </button>
            <button 
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); navigate("/about"); }}
              className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-left flex items-center gap-2"
            >
              <Info size={16} /> About Us
            </button>
          </div>

          {/* MOBILE HELP SECTION */}
          <div className="pt-2 border-t border-sky-800/80">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block mb-2">Help & Support</span>
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              <button 
                type="button"
                onClick={() => handleHelpNavigation('support')}
                className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-left flex items-center gap-2 text-sky-100"
              >
                <Headphones size={16} className="text-sky-300" /> Customer Support
              </button>
              <button 
                type="button"
                onClick={() => handleHelpNavigation('faq')}
                className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-left flex items-center gap-2 text-sky-100"
              >
                <HelpCircle size={16} className="text-amber-400" /> FAQ & Support
              </button>
            </div>
          </div>

          {/* PORTALS SECTION */}
          <div className="pt-2 border-t border-sky-800/80 space-y-2">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block">Portals</span>
            {!activeVendor ? (
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); navigate("/vendor_register"); }}
                  className="bg-emerald-700 hover:bg-emerald-600 p-2.5 rounded-lg text-xs font-bold text-center"
                >
                  Sell on BravoMart
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); navigate("/vendor_login"); }}
                  className="bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-xs font-bold text-center"
                >
                  Vendor Log In
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); navigate("/vendor_register"); }}
                  className="flex-1 bg-sky-800 hover:bg-sky-700 p-2.5 rounded-lg text-xs font-bold truncate"
                >
                  🤖 Vendor ({activeVendor.businessName || "Active"})
                </button>
                <button 
                  type="button"
                  onClick={() => { setActiveVendor(null); setIsMobileMenuOpen(false); navigate("/"); }}
                  className="bg-red-600 p-2.5 rounded-lg text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); navigate("/BravoAdmin"); }}
                className="bg-sky-800 hover:bg-sky-700 p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
              >
                <ShieldAlert size={14} /> Admin
              </button>
              <button 
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); navigate("/BravoSuperAdmin"); }}
                className="bg-sky-800 hover:bg-sky-700 p-2 rounded-lg text-xs font-semibold text-center"
              >
                🛡️ Verification ({pendingVendorsCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}