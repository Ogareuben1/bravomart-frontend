import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Users, Award, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  const navigate = useNavigate();

  const handleNavigateToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 px-4 sm:px-6 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb - Mobile Responsive Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-4 border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">About BravoMart</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Connecting shoppers, vendors, and trusted logistics seamlessly.
            </p>
          </div>
          <button 
            onClick={handleNavigateToMarketplace}
            className="text-xs bg-slate-900 text-white font-bold px-4 py-3 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <ArrowLeft size={14} /> Back to Store
          </button>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Empowering Modern Commerce
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Reinventing African E-Commerce with Security &amp; Speed.
            </h2>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              BravoMart is built to solve trust in online trade. By combining 7-day escrow protection, AI-assisted scam scanning, and verified dispatch logistics, we ensure every transaction is safe for buyers and profitable for vendors.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-bold text-gray-900 text-base">7-Day Escrow Protection</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your money is never released to the seller until you inspect and accept your items, keeping shopping 100% scam-free.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold">
              <Truck size={22} />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Verified Logistics</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Bravo dispatchers personally verify item condition before taking delivery live to your doorstep.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center font-bold">
              <Users size={22} />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Local &amp; Global Vendors</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              From local farm produce like Garri and Yam to heavy industrial machinery and solar tech, we empower vendors of all scales.
            </p>
          </div>
        </div>

        {/* Stat Highlights */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-600">100%</div>
            <div className="text-xs text-gray-500 font-semibold mt-1">Escrow Secured</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-600">7-Day</div>
            <div className="text-xs text-gray-500 font-semibold mt-1">Inspection Window</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-600">24/7</div>
            <div className="text-xs text-gray-500 font-semibold mt-1">AI Scam Defense</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-600">Verified</div>
            <div className="text-xs text-gray-500 font-semibold mt-1">Dispatch Fleet</div>
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Ready to shop with absolute peace of mind?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Browse verified listings from trusted vendors across Nigeria and beyond.
          </p>
          <button 
            onClick={handleNavigateToMarketplace}
            className="bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
          >
            Explore Marketplace Now
          </button>
        </div>

      </div>
    </div>
  );
}