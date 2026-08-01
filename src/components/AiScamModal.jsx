import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, X, Sparkles } from 'lucide-react';

export default function AiScamModal({ product, onClose }) {
  if (!product) return null;

  const { aiScamReport, vendorName, title } = product;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-sky-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-tr from-brandSky-dark to-sky-400 p-3 rounded-2xl text-white shadow-md">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
              Bravo AI Anti-Scam Audit
            </h3>
            <p className="text-xs text-gray-500">Real-time risk scan based on user feedback & verification</p>
          </div>
        </div>

        {/* Target Info */}
        <div className="bg-brandCream-light p-3 rounded-xl border border-amber-200/60 mb-4 text-xs">
          <p className="text-gray-500">Scanning Vendor & Item:</p>
          <p className="font-bold text-gray-900 truncate">{title}</p>
          <p className="text-brandSky-dark font-semibold">Vendor: {vendorName}</p>
        </div>

        {/* Trust Score Gauge */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl mb-4 border">
          <div>
            <span className="text-xs text-gray-500 block">AI Trust Score</span>
            <span className="text-2xl font-black text-gray-900">{aiScamReport.trustScore} / 100</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            aiScamReport.trustScore >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            <ShieldCheck size={14} /> {aiScamReport.status}
          </span>
        </div>

        {/* Positive Reports */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <CheckCircle size={14} /> Positive Verifications ({aiScamReport.positiveFlags.length})
          </h4>
          <ul className="space-y-1">
            {aiScamReport.positiveFlags.map((flag, idx) => (
              <li key={idx} className="text-xs text-gray-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                ✓ {flag}
              </li>
            ))}
          </ul>
        </div>

        {/* Negative / Caution Reports */}
        {aiScamReport.negativeFlags.length > 0 ? (
          <div className="space-y-2 mb-6">
            <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1">
              <AlertTriangle size={14} /> Cautions & Community Flagged Issues ({aiScamReport.negativeFlags.length})
            </h4>
            <ul className="space-y-1">
              {aiScamReport.negativeFlags.map((flag, idx) => (
                <li key={idx} className="text-xs text-gray-700 bg-amber-50 p-2 rounded-lg border border-amber-100">
                  ⚠️ {flag}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-emerald-50 text-emerald-800 text-xs p-2.5 rounded-lg mb-6 border border-emerald-100">
            🎉 Zero negative complaints or scam flags recorded for this vendor.
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full bg-brandSky hover:bg-brandSky-dark text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-sm"
        >
          Done & Back to Market
        </button>
      </div>
    </div>
  );
}