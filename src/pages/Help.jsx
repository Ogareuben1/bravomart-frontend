import React, { useState } from 'react';
import { 
  Search, HelpCircle, ShieldAlert, Truck, RefreshCw, 
  Phone, MessageSquare, Mail, ChevronDown, FileText 
} from 'lucide-react';

export default function Help({ onNavigateHome }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      cat: 'orders',
      q: 'How does the BravoMart 30-Minute Dispatch assignment work?',
      a: 'When you place an order, our smart system alerts the nearest available dispatch riders. The assigned rider has 30 minutes to confirm pickup. If unavailable, the system automatically reassigns your package to the next best rider.'
    },
    {
      cat: 'escrow',
      q: 'What is Escrow Protection and when is payment released?',
      a: 'Your money is safely held in Escrow when you place an order. Vendors and riders are only paid AFTER you inspect and confirm receipt of your item. You have up to 7 days to report any defect.'
    },
    {
      cat: 'returns',
      q: 'How do I request a refund or product replacement?',
      a: 'Go to your Customer Account dashboard under "My Orders", select the item, and click "Dispute/Return Order". Upload photos of the damaged or wrong product, and our support team will handle resolution within 24 hours.'
    },
    {
      cat: 'vendor',
      q: 'How do I become a verified vendor on BravoMart?',
      a: 'Click on "Sell on BravoMart" from the homepage menu, complete your business verification (CAC / Govt ID & Bank Details), and start listing items once approved by Bravo Admin.'
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.cat === activeCategory) &&
    (faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 px-4 sm:px-6 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <HelpCircle className="text-sky-600" /> Customer Care & Support
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Find answers, learn about Escrow, or reach our support team 24/7.</p>
          </div>
          <button 
            onClick={onNavigateHome}
            className="text-xs bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition"
          >
            ← Back to Store
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search help articles (e.g. escrow, tracking, dispatch timer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 text-xs sm:text-sm border rounded-xl focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'orders', label: 'Dispatch & Delivery' },
              { id: 'escrow', label: 'Escrow & Payments' },
              { id: 'returns', label: 'Refunds & Returns' },
              { id: 'vendor', label: 'Vendor Guide' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold transition ${
                  activeCategory === cat.id 
                    ? 'bg-sky-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-gray-900 border-b pb-3">Frequently Asked Questions</h3>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2 font-bold text-xs sm:text-sm text-gray-900 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`transition-transform text-gray-500 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 py-6 text-center">No matching FAQs found for your search term.</p>
          )}
        </div>

        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-2">
            <MessageSquare className="mx-auto text-emerald-600" size={28} />
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">WhatsApp Live Chat</h4>
            <p className="text-[11px] text-gray-500">Get instant responses from care agents.</p>
            <a 
              href="https://wa.me/2348000000000" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2"
            >
              Start Chat
            </a>
          </div>

          <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl text-center space-y-2">
            <Phone className="mx-auto text-sky-600" size={28} />
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">Phone Support</h4>
            <p className="text-[11px] text-gray-500">Mon - Sat (8am to 8pm WAT)</p>
            <a 
              href="tel:+2348000000000" 
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2"
            >
              Call 0800-BRAVO-HELP
            </a>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl text-center space-y-2">
            <Mail className="mx-auto text-indigo-600" size={28} />
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">Email Desk</h4>
            <p className="text-[11px] text-gray-500">Resolution time under 2 hours.</p>
            <a 
              href="mailto:support@bravomart.com" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2"
            >
              Send Email
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}