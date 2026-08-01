import React, { useState } from 'react';

// Default mock pending vendors if none are passed via props
const INITIAL_PENDING_VENDORS = [
  {
    id: 'v-pending-101',
    shopName: 'Kano Tech Hub',
    ownerName: 'Ibrahim Musa',
    email: 'musa@kanotech.ng',
    phone: '+234 803 123 4567',
    category: 'Electronics & Solar',
    address: '45 Zoo Road, Kano State',
    cacNumber: 'RC-1849201',
    submittedAt: '2026-07-28',
    status: 'pending'
  },
  {
    id: 'v-pending-102',
    shopName: 'Ibadan Organics',
    ownerName: 'Folake Adebayo',
    email: 'folake@ibadanorganics.com',
    phone: '+234 802 987 6543',
    category: 'Groceries & Agro',
    address: '12 Bodija Market Rd, Ibadan',
    cacNumber: 'BN-2938402',
    submittedAt: '2026-07-30',
    status: 'pending'
  },
  {
    id: 'v-pending-103',
    shopName: 'Lekki Couture',
    ownerName: 'Chiamaka Nwosu',
    email: 'chiamaka@lekkicouture.ng',
    phone: '+234 814 555 0192',
    category: 'Fashion & Wearables',
    address: '8 Admiralty Way, Lekki Phase 1, Lagos',
    cacNumber: 'RC-9921049',
    submittedAt: '2026-08-01',
    status: 'pending'
  }
];

export default function BravoSuperAdmin({
  pendingVendorsCount = 3,
  setPendingVendorsCount = () => {},
  vendorProducts = []
}) {
  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' | 'platform_stats' | 'commissions'
  const [pendingList, setPendingList] = useState(INITIAL_PENDING_VENDORS);
  const [commissionRate, setCommissionRate] = useState(5.0); // Default 5% platform fee
  const [payoutHoldDays, setPayoutHoldDays] = useState(3);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApproveVendor = (vendorId, shopName) => {
    setPendingList((prev) => prev.filter((v) => v.id !== vendorId));
    setPendingVendorsCount((prev) => Math.max(0, prev - 1));
    showToast(`✅ Vendor "${shopName}" has been approved!`);
  };

  const handleRejectVendor = (vendorId, shopName) => {
    setPendingList((prev) => prev.filter((v) => v.id !== vendorId));
    setPendingVendorsCount((prev) => Math.max(0, prev - 1));
    showToast(`❌ Vendor "${shopName}" application rejected.`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 text-slate-800">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl font-medium border border-slate-700 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl mb-8 border border-slate-800 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
              Level 5 Root Access
            </span>
            <span className="text-slate-400 text-xs">Bravo Engine v4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            🛡️ Bravo Super Admin HQ
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Global ecosystem oversight, merchant verification & platform economy control.
          </p>
        </div>

        {/* Global Quick Stats */}
        <div className="flex gap-4 flex-wrap">
          <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-3 rounded-xl min-w-[130px]">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Pending KYC</span>
            <span className="text-2xl font-black text-amber-400">{pendingList.length}</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-3 rounded-xl min-w-[130px]">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Total Catalog</span>
            <span className="text-2xl font-black text-sky-400">{vendorProducts.length}</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-3 rounded-xl min-w-[130px]">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Platform Fee</span>
            <span className="text-2xl font-black text-emerald-400">{commissionRate}%</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'approvals'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>📋 Vendor Approvals</span>
          {pendingList.length > 0 && (
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-xs font-black">
              {pendingList.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('platform_stats')}
          className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'platform_stats'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          📊 System Metrics
        </button>

        <button
          onClick={() => setActiveTab('commissions')}
          className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'commissions'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          ⚙️ Financial Settings
        </button>
      </div>

      {/* TAB 1: VENDOR APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Pending Merchant Verification Applications</h2>
              <p className="text-xs text-slate-500">
                Review submitted CAC documentation, store addresses, and contact info before enabling merchant sales.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
              Auto-Audit Security: Active
            </span>
          </div>

          {pendingList.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center">
              <span className="text-3xl block mb-2">🎉</span>
              <h3 className="text-lg font-bold">All caught up!</h3>
              <p className="text-sm text-emerald-700 mt-1">
                There are no pending vendor registration requests in the review queue.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingList.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900">{vendor.shopName}</h3>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        {vendor.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">ID: {vendor.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-xs text-slate-600">
                      <div><strong className="text-slate-800">Owner:</strong> {vendor.ownerName}</div>
                      <div><strong className="text-slate-800">Email:</strong> {vendor.email}</div>
                      <div><strong className="text-slate-800">Phone:</strong> {vendor.phone}</div>
                      <div><strong className="text-slate-800">CAC Reg #:</strong> <span className="font-mono text-indigo-600">{vendor.cacNumber}</span></div>
                      <div className="col-span-1 sm:col-span-2"><strong className="text-slate-800">Address:</strong> {vendor.address}</div>
                    </div>

                    <div className="text-[11px] text-slate-400 italic">
                      Submitted on {vendor.submittedAt}
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 min-w-[150px]">
                    <button
                      onClick={() => handleApproveVendor(vendor.id, vendor.shopName)}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      ✓ Approve Store
                    </button>
                    <button
                      onClick={() => handleRejectVendor(vendor.id, vendor.shopName)}
                      className="flex-1 md:flex-none px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SYSTEM METRICS */}
      {activeTab === 'platform_stats' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Platform Health & Global Analytics</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Active Merchants</span>
              <div className="text-3xl font-black text-slate-900 mt-2">142</div>
              <p className="text-xs text-emerald-600 font-semibold mt-1">↑ +12% from last month</p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Live Products Listed</span>
              <div className="text-3xl font-black text-indigo-600 mt-2">
                {1240 + vendorProducts.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">Including dynamic vendor additions</p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">System Status</span>
              <div className="text-xl font-bold text-emerald-600 mt-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                Operational (100% Uptime)
              </div>
              <p className="text-xs text-slate-500 mt-1">GPS & Escrow Engines Online</p>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-400 border-b border-slate-800 pb-2 font-bold uppercase">
              ⚡ Live Platform Audit Trail Log
            </div>
            <div>[09:21:04] GPS Node Gateway: Synchronized dispatch locations across 12 zones.</div>
            <div>[09:18:22] AI Audit Engine: Scanned catalog products with 0 scam flags triggered.</div>
            <div>[09:05:10] Escrow Gateway: Settlement pool ₦4,520,000 locked safely in transit.</div>
          </div>
        </div>
      )}

      {/* TAB 3: FINANCIAL & COMMISSION SETTINGS */}
      {activeTab === 'commissions' && (
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6 max-w-2xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Financial & Escrow Governance</h2>
            <p className="text-xs text-slate-500">
              Configure universal take rates and automated vendor payout hold periods.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Platform Take Rate Commission (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.5"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                  className="w-32 p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-xs text-slate-500">
                  Deducted automatically from each vendor item sale upon buyer confirmation.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Escrow Guarantee Hold Period (Days)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={payoutHoldDays}
                  onChange={(e) => setPayoutHoldDays(parseInt(e.target.value, 10) || 1)}
                  className="w-32 p-2.5 border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-xs text-slate-500">
                  Days money is held in escrow after delivery before releasing to vendor wallet.
                </span>
              </div>
            </div>

            <button
              onClick={() => showToast('⚙️ Financial governance policy saved successfully!')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
            >
              Save Configuration Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}