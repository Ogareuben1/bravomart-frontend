import React from 'react';
import { PackageCheck, Radio } from 'lucide-react';

export function OrderTracker({ orderTrackingId, setOrderTrackingId, isLiveTracking, onTrackOrder }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm space-y-3">
      <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
        <PackageCheck size={16} className="text-sky-600" /> Live Order Tracker
      </h3>
      <div className="flex gap-1.5">
        <input 
          type="text" 
          placeholder="Enter ID e.g. BM-9041" 
          value={orderTrackingId}
          onChange={(e) => setOrderTrackingId(e.target.value)}
          className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500"
        />
        <button 
          onClick={onTrackOrder}
          className="bg-sky-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-sky-700 transition-colors cursor-pointer"
        >
          Track
        </button>
      </div>

      {isLiveTracking && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 space-y-1">
          <p className="font-bold flex items-center gap-1">
            <Radio size={12} className="text-emerald-600 animate-pulse" /> Dispatcher En Route
          </p>
          <p className="text-gray-600">Rider #4012 is 1.8km away with your delivery.</p>
        </div>
      )}
    </div>
  );
}