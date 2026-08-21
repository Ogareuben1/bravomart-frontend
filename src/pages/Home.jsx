import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, ShoppingBag, Truck, Info, HelpCircle, Home as HomeIcon 
} from 'lucide-react';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();

  // Dynamic favicon configuration
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']");

    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    // Points directly to public/favicon.svg
    link.href = '/favicon.svg'; 
    link.type = 'image/svg+xml';
  }, []);

  // Progress tracking for forward journeys (0% = Shop, 100% = Home)
  const [motoProgress, setMotoProgress] = useState(0);
  const [carProgress, setCarProgress] = useState(0);
  const [truckProgress, setTruckProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMotoProgress((prev) => (prev >= 100 ? 0 : prev + 0.26));
      setCarProgress((prev) => (prev >= 100 ? 0 : prev + 0.16));
      setTruckProgress((prev) => (prev >= 100 ? 0 : prev + 0.10));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-sky-900 via-slate-900 to-emerald-950/80 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Brand Logo & Title Header */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="/favicon.svg" 
              alt="BravoMart Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain filter drop-shadow-md"
            />
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug">
              Local Merchants & Fast Dispatchers to Your Doorstep
            </h1>
          </div>
          
          {/* QUICK ACTION CARDS */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            
            {/* Marketplace */}
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-sky-600/90 hover:bg-sky-500 text-white p-3 rounded-2xl border border-sky-400/30 transition-all shadow-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group hover:-translate-y-1"
            >
              <div className="bg-sky-500/30 p-2 rounded-xl group-hover:bg-sky-400/40 transition-colors">
                <ShoppingBag size={20} className="text-sky-200" />
              </div>
              <span className="text-xs font-bold">Marketplace</span>
            </button>

            {/* Sell on BravoMart */}
            <button 
              onClick={() => navigate('/vendor_register')}
              className="bg-emerald-600/90 hover:bg-emerald-500 text-white p-3 rounded-2xl border border-emerald-400/30 transition-all shadow-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group hover:-translate-y-1"
            >
              <div className="bg-emerald-500/30 p-2 rounded-xl group-hover:bg-emerald-400/40 transition-colors">
                <Store size={20} className="text-emerald-200" />
              </div>
              <span className="text-xs font-bold">Sell on BravoMart</span>
            </button>

            {/* Become Dispatcher */}
            <button 
              onClick={() => navigate('/DispatcherPortal')}
              className="bg-amber-600/90 hover:bg-amber-500 text-white p-3 rounded-2xl border border-amber-400/30 transition-all shadow-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group hover:-translate-y-1"
            >
              <div className="bg-amber-500/30 p-2 rounded-xl group-hover:bg-amber-400/40 transition-colors">
                <Truck size={20} className="text-amber-200" />
              </div>
              <span className="text-xs font-bold">Become Dispatcher</span>
            </button>

            {/* About Us */}
            <button 
              onClick={() => navigate('/about')}
              className="bg-purple-600/90 hover:bg-purple-500 text-white p-3 rounded-2xl border border-purple-400/30 transition-all shadow-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group hover:-translate-y-1"
            >
              <div className="bg-purple-500/30 p-2 rounded-xl group-hover:bg-purple-400/40 transition-colors">
                <Info size={20} className="text-purple-200" />
              </div>
              <span className="text-xs font-bold">About Us</span>
            </button>

            {/* Help */}
            <button 
              onClick={() => navigate('/help?tab=support')}
              className="bg-indigo-600/90 hover:bg-indigo-500 text-white p-3 rounded-2xl border border-indigo-400/30 transition-all shadow-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group hover:-translate-y-1 col-span-2 sm:col-span-1"
            >
              <div className="bg-indigo-500/30 p-2 rounded-xl group-hover:bg-indigo-400/40 transition-colors">
                <HelpCircle size={20} className="text-indigo-200" />
              </div>
              <span className="text-xs font-bold">Help</span>
            </button>

          </div>
        </div>
      </section>

      {/* GREENFIELD BACKGROUND LOGISTICS */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4">
        <div 
          className="rounded-3xl p-4 md:p-6 shadow-2xl border border-emerald-600/40 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(6, 78, 59, 0.75), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop')`
          }}
        >
          
          {/* SPLIT SCREEN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* ROUTE 1: MOTORCYCLE (SHOP LEFT -> RESIDENCE RIGHT) */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2 text-emerald-200">
                <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                  <Store size={22} className="text-amber-400" />
                  <span className="text-sm font-bold">SHOP</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                  <HomeIcon size={22} className="text-sky-400" />
                  <span className="text-sm font-bold">RESIDENCE</span>
                </div>
              </div>

              {/* ASPHALT ROAD */}
              <div className="h-20 bg-stone-800 border-y-2 border-dashed border-yellow-400/80 rounded-xl relative flex items-center px-2 overflow-hidden shadow-inner">
                <div 
                  className="absolute text-3xl md:text-4xl filter drop-shadow-md select-none transition-opacity duration-300"
                  style={{ 
                    left: `${Math.min(motoProgress, 88)}%`,
                    transform: 'scaleX(-1)',
                    opacity: motoProgress >= 88 ? 0 : 1
                  }}
                >
                  🏍️
                </div>
              </div>
            </div>

            {/* ROUTE 2: CAR (SHOP LEFT -> RESIDENCE RIGHT) */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2 text-emerald-200">
                <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                  <Store size={22} className="text-amber-400" />
                  <span className="text-sm font-bold">SHOP</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                  <HomeIcon size={22} className="text-sky-400" />
                  <span className="text-sm font-bold">RESIDENCE</span>
                </div>
              </div>

              {/* ASPHALT ROAD */}
              <div className="h-20 bg-stone-800 border-y-2 border-dashed border-yellow-400/80 rounded-xl relative flex items-center px-2 overflow-hidden shadow-inner">
                <div 
                  className="absolute text-3xl md:text-4xl filter drop-shadow-md select-none transition-opacity duration-300"
                  style={{ 
                    left: `${Math.min(carProgress, 88)}%`,
                    transform: 'scaleX(-1)',
                    opacity: carProgress >= 88 ? 0 : 1
                  }}
                >
                  🚗
                </div>
              </div>
            </div>

            {/* ROUTE 3: TRUCK (SHOP LEFT -> RESIDENCE RIGHT) */}
            <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2 text-emerald-200">
                <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                  <Store size={22} className="text-amber-400" />
                  <span className="text-sm font-bold">DEPOT SHOP</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                  <HomeIcon size={22} className="text-sky-400" />
                  <span className="text-sm font-bold">RESIDENCE</span>
                </div>
              </div>

              {/* ASPHALT ROAD */}
              <div className="h-20 bg-stone-800 border-y-2 border-dashed border-yellow-400/80 rounded-xl relative flex items-center px-2 overflow-hidden shadow-inner">
                <div 
                  className="absolute text-3xl md:text-4xl filter drop-shadow-md select-none transition-opacity duration-300"
                  style={{ 
                    left: `${Math.min(truckProgress, 92)}%`,
                    transform: 'scaleX(-1)',
                    opacity: truckProgress >= 92 ? 0 : 1
                  }}
                >
                  🚚
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer setView={(view) => navigate(`/${view}`)} />
    </div>
  );
}