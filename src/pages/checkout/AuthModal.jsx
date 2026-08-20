import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [authMode, setAuthMode] = useState('login');
  
  const [loginInput, setLoginInput] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin({ input: loginInput, pass: loginPass });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      password: regPassword
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-150">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock size={24} />
          </div>
          <h3 className="font-extrabold text-lg text-gray-900">
            {authMode === 'login' ? 'Welcome Back to BravoMart' : 'Create Buyer Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {authMode === 'login' ? 'Sign in to complete your checkout securely.' : 'Register to secure 7-day Escrow buyer protection.'}
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold mb-6">
          <button 
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'login' ? 'bg-white shadow text-sky-600' : 'text-slate-500'}`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'register' ? 'bg-white shadow text-sky-600' : 'text-slate-500'}`}
          >
            Register
          </button>
        </div>

        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Email or Phone Number</label>
              <input 
                type="text" 
                required
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="e.g. buyer@example.com"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-xl shadow transition-all"
            >
              Login & Continue Checkout
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
              <input 
                type="text" 
                required
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="e.g. Chinedu Adeleke"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
              <input 
                type="email" 
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="buyer@example.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
              <input 
                type="tel" 
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="08012345678"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Delivery Address *</label>
              <input 
                type="text" 
                required
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                placeholder="Street name, City, State"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Password *</label>
              <input 
                type="password" 
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl shadow mt-2 transition-all"
            >
              Create Account & Complete Order
            </button>
          </form>
        )}

      </div>
    </div>
  );
}