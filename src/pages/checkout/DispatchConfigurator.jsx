import React from 'react';
import { MapPin, Truck, MessageSquare, Phone, Clock } from 'lucide-react';

export default function DispatchConfigurator({
  pickupLocations,
  isMultiPickup,
  deliveryAddress,
  setDeliveryAddress,
  userAccount,
  vehicleChoice,
  setVehicleChoice,
  filteredRiders,
  assignedRider,
  onSelectRider,
  timerSeconds,
  formatTimer,
  getWhatsAppDispatchLink
}) {
  return (
    <div className="space-y-6">
      
      {/* AUTOMATED GOOGLE MAPS PICKUP ADDRESSES */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <MapPin size={18} className="text-sky-600" /> Vendor Origin & Pickup Route
          </h3>
          {isMultiPickup && (
            <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
              5% Multi-Pickup Discount Applied
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Addresses are automatically synchronized from vendor shop registrations & uploaded product locations.
        </p>

        <div className="space-y-2">
          {pickupLocations.map((loc, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-400 w-16 flex-shrink-0">Pickup #{idx + 1}:</span>
              <span className="font-semibold text-gray-800 truncate">{loc}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Customer Delivery Destination {userAccount && "(Auto-filled)"}
          </label>
          <input 
            type="text" 
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter destination address..."
            className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* VEHICLE CAPACITY TYPE SELECTOR */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-sm text-gray-900 mb-1 flex items-center gap-2">
          <Truck size={18} className="text-sky-600" /> Select Dispatch Vehicle Capacity
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Select vehicle size matching load bulk. Filters available active riders operating that vehicle type.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
          {[
            { id: 'motorcycle', name: 'Motorcycle', label: 'Light items / Envelopes' },
            { id: 'tricycle', name: 'Tricycle (Keke)', label: 'Medium boxes' },
            { id: 'car', name: 'Sedan / Car', label: 'Fragile / Electronics' },
            { id: 'van', name: 'Delivery Van', label: 'Bulk store orders' },
            { id: 'truck', name: 'Heavy Truck', label: 'Heavy machinery' },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVehicleChoice(v.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                vehicleChoice === v.id
                  ? 'border-sky-500 bg-sky-50 shadow-sm font-bold ring-1 ring-sky-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <p className="font-bold text-gray-900 text-xs sm:text-sm">{v.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{v.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* DISPATCH RIDERS OPERATING SELECTED VEHICLE */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Truck size={18} className="text-emerald-600" /> Available {vehicleChoice.toUpperCase()} Drivers
          </h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            {filteredRiders.length} Online
          </span>
        </div>

        {filteredRiders.length > 0 ? (
          <div className="space-y-3">
            {filteredRiders.map((rider) => (
              <div 
                key={rider.id}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  assignedRider?.id === rider.id ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{rider.name}</span>
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-extrabold px-2 py-0.5 rounded uppercase">
                      {rider.vehicle}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    📍 {rider.distanceKm} km away • ⭐ {rider.rating} Rating
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a 
                    href={getWhatsAppDispatchLink(rider)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => onSelectRider(rider)}
                    className="flex-1 sm:flex-none text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-colors"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>

                  <a 
                    href={`tel:${rider.phone}`}
                    className="text-xs bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <Phone size={14} /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-xs">
            No active dispatch riders operating a <span className="font-bold text-gray-700">{vehicleChoice}</span> near your area right now.
          </div>
        )}

        {/* ACTIVE TIMER BANNER */}
        {assignedRider && (
          <div className="mt-4 p-3.5 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Clock size={20} className="text-amber-600 animate-spin flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-amber-900 truncate">Rider Confirmation Timer: {assignedRider.name}</p>
                <p className="text-amber-700 text-[10px] sm:text-[11px]">Auto-reassigns if unconfirmed in 30 mins.</p>
              </div>
            </div>
            <span className="font-mono font-black text-amber-900 text-sm sm:text-base bg-amber-200/60 px-2.5 py-1 rounded-lg">
              {formatTimer(timerSeconds)}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}