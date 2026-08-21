import React from 'react';
import { PackageCheck, Search, Radio, Truck, MapPin } from 'lucide-react';

export function OrderTracker({ orderTrackingId, setOrderTrackingId, isLiveTracking, onTrackOrder }) {
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onTrackOrder(e);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-sky-100 dark:border-slate-800 shadow-sm space-y-3">
      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <PackageCheck size={18} className="text-sky-600 dark:text-sky-400" /> 
        Live Order Tracker
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Enter ID e.g. BM-9041" 
            value={orderTrackingId}
            onChange={(e) => setOrderTrackingId(e.target.value)}
            className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>

        <button 
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
        >
          <Search size={14} />
          <span>Track</span>
        </button>
      </form>

      {isLiveTracking && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <Radio size={14} className="animate-pulse text-emerald-600 dark:text-emerald-400" /> 
              Dispatcher En Route
            </span>
            <span className="flex items-center gap-1 text-[11px] bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
              <Truck size={12} /> Live
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300 text-[11px] font-medium leading-relaxed">
            <MapPin size={13} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>Rider #4012 is 1.8km away with your delivery.</span>
          </div>
        </div>
      )}
    </div>
  );
}