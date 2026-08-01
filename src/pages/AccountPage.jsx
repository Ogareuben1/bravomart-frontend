import React, { useState } from 'react';
import { User, Lock, Mail, Phone, MapPin, ShieldCheck, ShoppingBag, LogOut, Key } from 'lucide-react';

export default function AccountPage({ userAccount, setUserAccount, onNavigateHome }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setUserAccount({
      fullName: email.split('@')[0] || "Valued Customer",
      email: email,
      phone: "08030001122",
      primaryDeliveryAddress: "Block 4, Lekki Phase 1, Lagos",
      role: 'customer'
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUserAccount({
      fullName,
      email,
      phone,
      primaryDeliveryAddress: address,
      role: 'customer'
    });
  };

  const handleLogout = () => {
    setUserAccount(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 px-4 sm:px-6 font-sans text-gray-800">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Welcome to BravoMart</h1>
          <button 
            onClick={onNavigateHome}
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            ← Store
          </button>
        </div>

        {/* LOGGED IN VIEW */}
        {userAccount ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-12 h-12 bg-sky-100 text-sky-700 font-black text-xl rounded-full flex items-center justify-center">
                {userAccount.fullName ? userAccount.fullName[0].toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base text-gray-900 truncate">{userAccount.fullName}</h3>
                <p className="text-xs text-gray-500 truncate">{userAccount.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-gray-500 flex items-center gap-2"><Phone size={14} /> Phone:</span>
                <span className="font-bold text-gray-800">{userAccount.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-gray-500 flex items-center gap-2"><MapPin size={14} /> Address:</span>
                <span className="font-bold text-gray-800 truncate max-w-[180px]">{userAccount.primaryDeliveryAddress || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold">
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> Account Status:</span>
                <span>Verified Buyer</span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        ) : (
          /* LOGGED OUT VIEW - TABBED FORM */
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-5">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button 
                onClick={() => setTab('login')}
                className={`flex-1 py-2.5 rounded-lg transition ${tab === 'login' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setTab('register')}
                className={`flex-1 py-2.5 rounded-lg transition ${tab === 'register' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
              >
                Register
              </button>
            </div>

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email or Phone</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" required 
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="password" required 
                      value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 rounded-xl transition">
                  Sign In to Account
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input 
                    type="text" required 
                    value={fullName} onChange={e => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                  <input 
                    type="email" required 
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" required 
                    value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="08012345678"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Delivery Address *</label>
                  <input 
                    type="text" required 
                    value={address} onChange={e => setAddress(e.target.value)}
                    placeholder="Street, City, State"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl transition mt-2">
                  Create BravoMart Account
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}