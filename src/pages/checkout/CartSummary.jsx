import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function CartSummary({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  calculateItemShippingFee,
  calculateItemDistance,
  productsTotal, 
  totalShippingFee, 
  platformFee, 
  grandTotal,
  isMultiPickup
}) {
  return (
    <div className="space-y-6">
      {/* CART ITEM LIST */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center justify-between">
          <span>Cart Items ({cartItems.length})</span>
          <span className="text-xs text-slate-400 font-normal">Quantities</span>
        </h3>

        {cartItems.length > 0 ? (
          <div className="divide-y space-y-3">
            {cartItems.map((item, idx) => (
              <div key={idx} className="pt-3 flex items-center justify-between gap-3 text-xs">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0" />
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{item.title || "Cart Item"}</h4>
                  <p className="text-gray-400 text-[10px]">
                    Weight: {item.weightKg || 1}kg • Distance: {calculateItemDistance(item)}km
                  </p>
                  <p className="font-extrabold text-sky-600 mt-0.5">
                    ₦{(item.salePrice || 15000).toLocaleString()} each
                  </p>
                </div>

                <div className="flex items-center border rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                  <button 
                    onClick={() => onUpdateQuantity(idx, -1)}
                    className="p-1.5 hover:bg-slate-200 text-gray-600"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-2 sm:px-3 font-bold text-xs">{item.quantity || 1}</span>
                  <button 
                    onClick={() => onUpdateQuantity(idx, 1)}
                    className="p-1.5 hover:bg-slate-200 text-gray-600"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-black text-gray-900 block">
                    ₦{((item.salePrice || 15000) * (item.quantity || 1)).toLocaleString()}
                  </span>
                  <button onClick={() => onRemoveItem(idx)} className="text-red-500 hover:text-red-700 text-[10px] mt-1 ml-auto block">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-xs">
            Your cart is empty. Add products to proceed.
          </div>
        )}
      </div>

      {/* PRICING BREAKDOWN BASED ON DISTANCE x WEIGHT x PER_KG AMOUNT */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-md space-y-5">
        <h3 className="font-bold text-base text-gray-900 border-b pb-3">Order Price Summary</h3>

        <div className="space-y-3 text-xs border-b pb-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-gray-700 text-[11px] uppercase tracking-wide">Itemized Shipping Breakdown</h4>
            {isMultiPickup && (
              <span className="text-[10px] font-bold text-emerald-600">5% Discount Applied</span>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => {
                const itemDist = calculateItemDistance(item);
                const itemShipping = calculateItemShippingFee(item);
                return (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span className="truncate pr-2">{item.title || `Product #${idx + 1}`}</span>
                      <span>₦{((item.salePrice || 15000) * (item.quantity || 1)).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-[10px] text-gray-500 pt-1 border-t border-slate-200/50">
                      <span>Formula ({itemDist}km × {item.weightKg || 1}kg × rate):</span>
                      <span className="font-bold text-slate-800">Shipping: ₦{itemShipping.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-50 p-2.5 rounded-lg border text-gray-500 text-[11px] text-center italic">
              No items in cart.
            </div>
          )}
        </div>

        {/* GRAND TOTAL CALCULATIONS */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Products Subtotal:</span>
            <span className="font-bold text-gray-900">₦{productsTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Calculated Distance Shipping Total:</span>
            <span className="font-bold text-gray-900">₦{totalShippingFee.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Platform Service Charge (3%):</span>
            <span className="font-bold text-gray-900">₦{platformFee.toLocaleString()}</span>
          </div>

          <div className="pt-3 border-t flex justify-between items-baseline text-base font-black text-gray-900">
            <span>Overall Total Payable:</span>
            <span className="text-lg sm:text-xl text-sky-600">₦{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}