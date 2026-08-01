import React, { useState, useEffect } from 'react';
import { 
  Truck, ShieldCheck, MapPin, Phone, BellRing, Navigation, 
  Wallet, CheckCircle, XCircle, Power, Lock, Upload, 
  AlertTriangle, Clock, Plus, History, CheckCircle2, ShieldAlert
} from 'lucide-react';

export default function DispatcherPortal({ onGoToHome, activeRider, setActiveRider }) {
  // Mode: 'register' | 'login' | 'pending_verification' | 'dashboard'
  const [mode, setMode] = useState(activeRider ? (activeRider.isApproved ? 'dashboard' : 'pending_verification') : 'register');

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [currentResidentialAddress, setCurrentResidentialAddress] = useState('');
  const [permanentHomeAddress, setPermanentHomeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idType, setIdType] = useState('nin');
  const [idFile, setIdFile] = useState(null);
  const [vehicleType, setVehicleType] = useState('motorcycle');
  const [initialVehicleRegNum, setInitialVehicleRegNum] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Vehicle History Addition State (Inside Dashboard)
  const [newRegNumInput, setNewRegNumInput] = useState('');
  const [newVehicleTypeInput, setNewVehicleTypeInput] = useState('motorcycle');

  // Login State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Dashboard Live Tracking & Ring Logic State
  const [isAvailable, setIsAvailable] = useState(true);
  const [liveCoords, setLiveCoords] = useState({ lat: 6.5244, lng: 3.3792, address: "Ikeja, Lagos, Nigeria" });
  const [hasIncomingOrder, setHasIncomingOrder] = useState(false);
  const [incomingOrderDetails, setIncomingOrderDetails] = useState(null);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    if (activeRider) {
      if (activeRider.isApproved) {
        setMode('dashboard');
        setIsAvailable(activeRider.isAvailable ?? true);
      } else {
        setMode('pending_verification');
      }
    }
  }, [activeRider]);

  // Audio Ringing Alert Simulation
  useEffect(() => {
    let soundInterval;
    if (isRinging) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playBeep = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      };
      playBeep();
      soundInterval = setInterval(playBeep, 1200);
    }
    return () => clearInterval(soundInterval);
  }, [isRinging]);

  // Registration Submission Handler
  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !currentResidentialAddress || !permanentHomeAddress || !phoneNumber || !username || !password || !initialVehicleRegNum) {
      alert("Please fill in all required fields marked with (*).");
      return;
    }

    const newRider = {
      id: "RIDER-" + Math.floor(100000 + Math.random() * 900000),
      fullName,
      currentResidentialAddress,
      permanentHomeAddress,
      phoneNumber,
      email,
      idType,
      username,
      password,
      isApproved: false, // Must wait for admin verification
      vehicleHistory: [
        {
          regNumber: initialVehicleRegNum.toUpperCase(),
          type: vehicleType,
          dateAdded: new Date().toLocaleDateString(),
          isCurrent: true
        }
      ],
      walletNaira: 0,
      walletUsdEquivalent: 0,
      isAvailable: false,
      rideHistory: []
    };

    setActiveRider(newRider);
    setMode('pending_verification');
  };

  // Add New Vehicle Registration Number (Immutable Record append)
  const handleAddNewVehicle = (e) => {
    e.preventDefault();
    if (!newRegNumInput.trim()) return;

    const updatedHistory = activeRider.vehicleHistory.map(v => ({ ...v, isCurrent: false }));
    updatedHistory.unshift({
      regNumber: newRegNumInput.trim().toUpperCase(),
      type: newVehicleTypeInput,
      dateAdded: new Date().toLocaleDateString(),
      isCurrent: true
    });

    const updatedRider = {
      ...activeRider,
      vehicleHistory: updatedHistory
    };

    setActiveRider(updatedRider);
    setNewRegNumInput('');
    alert("New vehicle registration logged successfully. Previous records preserved.");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginUser.trim() || !loginPass.trim()) return;

    // Simulate logged-in verified rider
    const verifiedRider = {
      id: "RIDER-992014",
      fullName: loginUser + " (Verified Dispatcher)",
      currentResidentialAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
      permanentHomeAddress: "Compound 4, Umudike, Abia State",
      phoneNumber: "08039948821",
      email: loginUser + "@bravomart.ng",
      isApproved: true,
      vehicleHistory: [
        { regNumber: "LAG-882-AB", type: "motorcycle", dateAdded: "01/02/2026", isCurrent: true },
        { regNumber: "KJA-104-XY", type: "motorcycle", dateAdded: "15/05/2024", isCurrent: false }
      ],
      walletNaira: 74500,
      walletUsdEquivalent: (74500 / 1500).toFixed(2),
      isAvailable: true,
      rideHistory: [
        { id: "B9201847102", date: "Today, 10:15 AM", pickup: "Alaba Int. Market", dropoff: "Ikeja GRA", fee: 5500, status: "Successful" },
        { id: "B8810294104", date: "Yesterday", pickup: "Computer Village", dropoff: "Yaba", fee: 3500, status: "Successful" }
      ]
    };

    setActiveRider(verifiedRider);
    setMode('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-brandSky text-white p-2.5 rounded-xl shadow-md">
              <Truck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">BravoMart Dispatcher Portal</h1>
              <p className="text-xs text-gray-500">Verified Logistics & Delivery Network</p>
            </div>
          </div>

          <div className="flex gap-2">
            {activeRider && (
              <button 
                onClick={() => { setActiveRider(null); setMode('register'); }}
                className="text-xs bg-red-100 text-red-700 font-bold px-3 py-2 rounded-lg"
              >
                Logout Account
              </button>
            )}
            <button 
              onClick={onGoToHome}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg"
            >
              ← Back to Homepage
            </button>
          </div>
        </div>

        {/* 1. DISPATCHER REGISTRATION FORM */}
        {mode === 'register' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-brandSky-dark to-sky-700 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck size={24} className="text-amber-300" /> Apply to Become a Bravo Dispatcher
              </h2>
              <p className="text-xs text-sky-100 mt-1">Submit your verification details. Admin approval is required before account activation.</p>
            </div>

            <form onSubmit={handleRegister} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name (As shown on National ID) *</label>
                <input 
                  type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chukwuma Emmanuel"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone Number (Compulsory) *</label>
                <input 
                  type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="08012345678"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              {/* SPLIT ADDRESS SECTION */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Residential Address (Where you live now) *</label>
                <input 
                  type="text" required value={currentResidentialAddress} onChange={(e) => setCurrentResidentialAddress(e.target.value)}
                  placeholder="Current street address, LGA, State"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Permanent Home Address (Your ancestral roots/home town) *</label>
                <input 
                  type="text" required value={permanentHomeAddress} onChange={(e) => setPermanentHomeAddress(e.target.value)}
                  placeholder="Village / Permanent family compound, State of origin"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address (Optional)</label>
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="rider@example.com"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Category *</label>
                <select 
                  value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                >
                  <option value="motorcycle">🏍️ Motorcycle / Bike</option>
                  <option value="tricycle">🛺 Tricycle (Keke)</option>
                  <option value="car">🚗 Sedan / Car</option>
                  <option value="van">🚐 Delivery Van</option>
                  <option value="truck">🚚 Heavy Duty Truck</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Registration Number *</label>
                <input 
                  type="text" required value={initialVehicleRegNum} onChange={(e) => setInitialVehicleRegNum(e.target.value)}
                  placeholder="e.g. LAG-482-XA"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky uppercase font-mono font-bold"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Upload ID (NIN / Voter's Card / Driver's License) *</label>
                <input 
                  type="file" required onChange={(e) => setIdFile(e.target.files[0])}
                  className="text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sky-50 file:text-brandSky-dark"
                />
              </div>

              <div className="col-span-2 border-t pt-3 mt-2">
                <h3 className="font-bold text-xs text-gray-900 mb-2">Create Security Credentials</h3>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Create Username *</label>
                <input 
                  type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. rider_emmanuel"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Create Password *</label>
                <input 
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="col-span-2 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={16} /> Submit Application for Physical Verification
                </button>

                <button 
                  type="button" onClick={() => setMode('login')}
                  className="text-xs text-brandSky-dark font-bold hover:underline"
                >
                  Already registered? Login →
                </button>
              </div>

            </form>
          </div>
        )}

        {/* 2. PENDING PHYSICAL VERIFICATION SCREEN */}
        {mode === 'pending_verification' && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl border border-amber-200 shadow-md text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Clock size={36} className="animate-spin" />
            </div>
            <h2 className="text-xl font-black text-gray-900">Application Under Physical Verification</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Thank you, <b>{activeRider?.fullName}</b>. Your uploaded ID card, permanent home address, and vehicle registration numbers are currently under physical verification by the <b>BravoMart Verification Team</b>.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-left space-y-2 border">
              <p><b>Verification Status:</b> <span className="text-amber-600 font-bold">PENDING APPROVAL</span></p>
              <p><b>Current Vehicle Reg:</b> {activeRider?.vehicleHistory[0]?.regNumber}</p>
              <p><b>Residential:</b> {activeRider?.currentResidentialAddress}</p>
              <p><b>Permanent Ancestral Address:</b> {activeRider?.permanentHomeAddress}</p>
            </div>
            <div className="p-3 bg-sky-50 rounded-xl text-[11px] text-sky-800 font-medium">
              📲 Once verified, an SMS & Email notification will be sent to your phone to log in and start accepting orders.
            </div>
            <button 
              onClick={() => {
                // Temporary Admin Bypass Demo Button
                const approved = { ...activeRider, isApproved: true };
                setActiveRider(approved);
                setMode('dashboard');
              }}
              className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              [Demo Mode] Simulate Admin Physical Approval
            </button>
          </div>
        )}

        {/* 3. LOGIN SCREEN */}
        {mode === 'login' && (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-brandSky-dark p-6 text-white">
              <h2 className="text-lg font-bold flex items-center gap-2"><Lock size={20} /> Dispatcher Login</h2>
            </div>
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Username / Phone</label>
                <input 
                  type="text" required value={loginUser} onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <input 
                  type="password" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <button type="submit" className="w-full bg-brandSky hover:bg-brandSky-dark text-white font-bold text-xs py-3 rounded-xl">
                Access Active Rider Dashboard
              </button>
            </form>
          </div>
        )}

        {/* 4. ACTIVE VERIFIED RIDER DASHBOARD */}
        {mode === 'dashboard' && activeRider && activeRider.isApproved && (
          <div className="space-y-6">
            
            {/* Availability & Status Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  <Power size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Status: {isAvailable ? <span className="text-emerald-600 font-black">ONLINE & AVAILABLE</span> : <span className="text-red-600 font-black">OFFLINE</span>}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isAvailable ? "Visible to customers at checkout." : "Hidden from checkout dispatch assignment."}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-full md:w-auto font-extrabold text-xs px-6 py-3 rounded-xl shadow-sm transition-all ${
                  isAvailable ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                Toggle {isAvailable ? "Go Offline" : "Go Online"}
              </button>
            </div>

            {/* Wallet & Vehicle History Management */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Wallet Overview */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Wallet size={16} className="text-amber-400" /> Bravo Rider Wallet
                  </span>
                  <div className="mt-4">
                    <h2 className="text-3xl font-black text-white">₦{activeRider.walletNaira.toLocaleString()}</h2>
                    <p className="text-xs text-slate-400 mt-1">≈ ${activeRider.walletUsdEquivalent} USD</p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-700 text-xs flex justify-between text-slate-300">
                  <span>Verified Identity:</span>
                  <span className="text-emerald-400 font-bold">PASSED ✓</span>
                </div>
              </div>

              {/* Vehicle Registration Logs (Immutable Append Logic) */}
              <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-xs text-gray-900 flex items-center gap-2">
                  <History size={16} className="text-brandSky-dark" /> Vehicle Registration Number History
                </h3>

                {/* Add New Vehicle Form */}
                <form onSubmit={handleAddNewVehicle} className="flex flex-col sm:flex-row gap-2 bg-slate-50 p-3 rounded-xl border">
                  <input 
                    type="text" required
                    placeholder="Add New Vehicle Reg (e.g. KJA-901-ZZ)"
                    value={newRegNumInput}
                    onChange={(e) => setNewRegNumInput(e.target.value)}
                    className="flex-1 text-xs p-2.5 border rounded-lg uppercase font-mono font-bold"
                  />
                  <select 
                    value={newVehicleTypeInput} 
                    onChange={(e) => setNewVehicleTypeInput(e.target.value)}
                    className="text-xs p-2.5 border rounded-lg font-semibold"
                  >
                    <option value="motorcycle">Motorcycle</option>
                    <option value="tricycle">Tricycle</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="truck">Truck</option>
                  </select>
                  <button type="submit" className="bg-brandSky hover:bg-brandSky-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1">
                    <Plus size={14} /> Add Registration
                  </button>
                </form>

                {/* Historical Log Display */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {activeRider.vehicleHistory?.map((veh, index) => (
                    <div key={index} className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${veh.isCurrent ? 'bg-emerald-50 border-emerald-300 font-bold' : 'bg-slate-50 text-gray-500'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-900">{veh.regNumber}</span>
                        <span className="uppercase text-[10px] bg-white px-2 py-0.5 rounded border">{veh.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]">{veh.dateAdded}</span>
                        {veh.isCurrent ? (
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-black">ACTIVE</span>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">ARCHIVED RECORD</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 italic">
                  🔒 Historical vehicle registration numbers cannot be deleted or altered once submitted.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}