import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, HelpCircle, Phone, MessageSquare, Mail, ChevronDown, 
  Headphones, Send, CheckCircle2, Clock, ShieldCheck 
} from 'lucide-react';

export default function Help({ onNavigateHome }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get active tab from URL query params: ?tab=faq OR ?tab=support
  const initialTab = searchParams.get('tab') || 'support';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Support Ticket Form State
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Sync tab with URL search parameter whenever URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && (tabFromUrl === 'support' || tabFromUrl === 'faq')) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

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

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (ticketData.name && ticketData.email && ticketData.message) {
      setTicketSubmitted(true);
      setTimeout(() => {
        setTicketSubmitted(false);
        setTicketData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 px-4 sm:px-6 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <HelpCircle className="text-sky-600" /> Help & Support Hub
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {activeTab === 'support' 
                ? "Reach out directly to our 24/7 Customer Support Team & Resolution Center." 
                : "Browse frequently asked questions and quick guides."}
            </p>
          </div>
          
          <button 
            onClick={() => onNavigateHome ? onNavigateHome() : navigate('/')}
            className="text-xs bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            ← Back to Store
          </button>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex bg-slate-200 p-1.5 rounded-2xl max-w-md mx-auto text-xs font-bold shadow-inner">
          <button
            onClick={() => handleTabChange('support')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'support'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Headphones size={16} /> Customer Support
          </button>
          
          <button
            onClick={() => handleTabChange('faq')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle size={16} /> FAQ & Support
          </button>
        </div>

        {/* ==================== TAB 1: CUSTOMER SUPPORT ==================== */}
        {activeTab === 'support' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Quick Live Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-2 shadow-sm">
                <MessageSquare className="mx-auto text-emerald-600" size={28} />
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">WhatsApp Live Chat</h4>
                <p className="text-[11px] text-gray-500">Instant responses from active agents.</p>
                <a 
                  href="https://wa.me/2348000000000" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2 transition"
                >
                  Start WhatsApp Chat
                </a>
              </div>

              <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl text-center space-y-2 shadow-sm">
                <Phone className="mx-auto text-sky-600" size={28} />
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">Phone Hotline</h4>
                <p className="text-[11px] text-gray-500">Mon - Sat (8:00 AM - 8:00 PM WAT)</p>
                <a 
                  href="tel:+2348000000000" 
                  className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2 transition"
                >
                  Call 0800-BRAVO-HELP
                </a>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl text-center space-y-2 shadow-sm">
                <Mail className="mx-auto text-indigo-600" size={28} />
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">Email Desk</h4>
                <p className="text-[11px] text-gray-500">Direct response within 2 hours.</p>
                <a 
                  href="mailto:support@bravomart.com" 
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2 transition"
                >
                  Send Email
                </a>
              </div>
            </div>

            {/* DIRECT SUPPORT TICKET FORM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 border-slate-100">
                <Headphones className="text-sky-600" size={20} />
                <h3 className="font-bold text-base text-gray-900">Submit a Support Ticket</h3>
              </div>

              {ticketSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-2">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                  <h4 className="font-bold text-emerald-900 text-sm">Ticket Submitted Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    A customer support specialist has been assigned to your issue and will reply via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Your Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="John Doe"
                        value={ticketData.name}
                        onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Your Email Address *</label>
                      <input 
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={ticketData.email}
                        onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Subject / Order ID (Optional)</label>
                    <input 
                      type="text"
                      placeholder="e.g. Issue with Order BM-9041"
                      value={ticketData.subject}
                      onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Describe Your Issue *</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Please explain what happened so our team can resolve it quickly..."
                      value={ticketData.message}
                      onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send size={16} /> Submit Ticket
                  </button>
                </form>
              )}
            </div>

            {/* ESCROW GUARANTEE BANNER */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={32} className="text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">7-Day Escrow Buyer Guarantee</h4>
                  <p className="text-xs text-slate-300">Your payments are protected until you physically inspect your item.</p>
                </div>
              </div>
              <button 
                onClick={() => handleTabChange('faq')}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap cursor-pointer"
              >
                Learn More
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: FAQ SUPPORT ==================== */}
        {activeTab === 'faq' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
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
                    className={`text-xs px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
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
                      className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2 font-bold text-xs sm:text-sm text-gray-900 transition cursor-pointer"
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

          </div>
        )}

      </div>
    </div>
  );
}