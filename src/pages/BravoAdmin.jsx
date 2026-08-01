import React, { useState } from 'react';
import { 
  ShieldCheck, Users, ShoppingBag, DollarSign, AlertCircle, 
  CheckCircle, RefreshCw, Lock, ArrowUpRight, Truck, Search 
} from 'lucide-react';

export default function BravoAdmin({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'vendors' | 'escrow'

  // Mock Admin State Data
  const stats = {
    totalSales: "₦48,250,000",
    escrowLocked: "₦12,400,000",
    activeVendors: 142,
    pendingVerifications: 5
  };

  const pendingVendors = [
    { id: 1, name: "Alaba Mega Tech", owner: "Chidi Nnamdi", phone: "08031112233", category: "Electronics", status: "Pending CAC" },
    { id: 2, name: "Lekki Fashion Hub", owner: "Bisi Adebayo", phone: "08022223344", category: "Apparel", status: "Pending ID" },
  ];

  const escrowTransactions = [
    { orderId: "B9823104921", buyer: "Samuel O.", vendor: "TechHub Ltd", amount: "₦145,000", status: "Held in Escrow", rider: "Tunde B." },
    { orderId: "B7712390122", buyer: "Amina K.", vendor: "Fashion Direct", amount: "₦32,000", status: "Delivered (Pending Release)", rider: "Sani M." },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 sm:py-8 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Bravo Admin Control Desk</h1>
              <p className="text-xs text-slate-400">Platform Escrow, Vendor Approvals & System Oversight</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onNavigateHome}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-3.5 py-2 rounded-xl transition"
            >
              Exit to Store
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs font-bold overflow-x-auto">
          {['overview', 'vendors', 'escrow'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl capitalize transition flex-shrink-0 ${
                activeTab === tab 
                  ? 'bg-amber-500 text-slate-950 font-black shadow' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-[11px] text-slate-400 font-medium">Total Platform Volume</p>
            <p className="text-lg sm:text-2xl font-black text-amber-400 mt-1">{stats.totalSales}</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-[11px] text-slate-400 font-medium">Escrow Funds Locked</p>
            <p className="text-lg sm:text-2xl font-black text-sky-400 mt-1">{stats.escrowLocked}</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-[11px] text-slate-400 font-medium">Active Vendors</p>
            <p className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">{stats.activeVendors}</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <p className="text-[11px] text-slate-400 font-medium">Pending Verifications</p>
            <p className="text-lg sm:text-2xl font-black text-rose-400 mt-1">{stats.pendingVerifications}</p>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & PENDING QUEUES */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Vendor Approvals Queue */}
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Users size={16} className="text-amber-400" /> Pending Vendor Applications
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">
                  {pendingVendors.length} Action Needed
                </span>
              </div>

              <div className="space-y-3">
                {pendingVendors.map(v => (
                  <div key={v.id} className="bg-slate-900 p-3.5 rounded-xl border border-slate-700/80 text-xs flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <p className="font-bold text-white">{v.name}</p>
                      <p className="text-[10px] text-slate-400">{v.owner} • {v.phone} • {v.category}</p>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg">
                      Approve CAC
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow Release Control Queue */}
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Lock size={16} className="text-sky-400" /> Escrow Release Approvals
                </h3>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded">
                  Live Stream
                </span>
              </div>

              <div className="space-y-3">
                {escrowTransactions.map((tx, idx) => (
                  <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-amber-300">{tx.orderId}</span>
                      <span className="font-black text-white">{tx.amount}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Buyer: {tx.buyer}</span>
                      <span>Vendor: {tx.vendor}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-[10px] text-emerald-400 font-bold">● {tx.status}</span>
                      <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] px-2.5 py-1 rounded">
                        Force Manual Release
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: VENDOR MANAGEMENT */}
        {activeTab === 'vendors' && (
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-4">
            <h3 className="font-bold text-sm text-white">Merchant Directory & Compliance</h3>
            <p className="text-xs text-slate-400">Review, ban, or update store status across all active BravoMart vendors.</p>
            <div className="p-8 text-center text-slate-500 text-xs italic bg-slate-900 rounded-xl border border-slate-800">
              [Vendor Directory database controls will display here]
            </div>
          </div>
        )}

        {/* TAB 3: ESCROW DISPUTE DESK */}
        {activeTab === 'escrow' && (
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-4">
            <h3 className="font-bold text-sm text-white">Escrow Dispute Resolution Center</h3>
            <p className="text-xs text-slate-400">Arbitrate contested payments between buyers and merchants.</p>
            <div className="p-8 text-center text-slate-500 text-xs italic bg-slate-900 rounded-xl border border-slate-800">
              [Active Escrow Dispute Queue will display here]
            </div>
          </div>
        )}

      </div>
    </div>
  );
}