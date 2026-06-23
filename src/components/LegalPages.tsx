import React from 'react';
import { ShieldAlert, Mail, Book, Sparkles, Scale, Info } from 'lucide-react';

interface LegalPagesProps {
  pageType: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';
  onBackToHome: () => void;
}

export function LegalPages({ pageType, onBackToHome }: LegalPagesProps) {
  const renderPageContent = () => {
    switch (pageType) {
      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" /> About LiveTools
            </h2>
            <p className="leading-relaxed text-slate-600">
              LiveTools.me is committed to being the internet's largest, fastest, and most secure collection of high-utility browser tools. Our direct goal is to supply essential conversion, calculation, formatting, and optimization algorithms completely client-side.
            </p>
            <p className="leading-relaxed text-slate-600">
              By shifting the execution burden from dense, cloud-hosted server containers directly onto standard browser JavaScript compilers, we provide instant operations with absolute privacy limits. We do not store log variables, file uploads, passwords, or transaction structures.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4" /> Core Technical Philosophies
              </span>
              <ul className="list-disc pl-5 text-xs text-blue-700 space-y-1">
                <li>100% Secure offline browser execution.</li>
                <li>Instant response latency times (zero queue delays).</li>
                <li>Zero membership or subscription barriers.</li>
                <li>Fully optimized lightweight layouts.</li>
              </ul>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600" /> Contact Support Team
            </h2>
            <p className="leading-relaxed text-slate-600">
              Have feature proposals, custom tools recommendation, or feedback queries? Get in touch with our web administration group:
            </p>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-mono text-xs text-slate-700">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span>Support Desk Email:</span>
                <span className="font-bold text-slate-800">support@livetools.me</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span>Response Target:</span>
                <span className="font-bold text-slate-800">Within 24 Hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API integrations requests:</span>
                <span className="font-bold text-slate-800">manzclinicppm@gmail.com</span>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-600" /> Privacy Policy
            </h2>
            <p className="leading-relaxed text-slate-600 text-xs text-slate-500">
              Last updated: June 4, 2026
            </p>
            <p className="leading-relaxed text-slate-600">
              We highly respect user transparency borders. Our fundamental policy is simple: **we do not request, track, or save any personal entries**.
            </p>
            <h3 className="text-md font-bold text-slate-800 mt-4">1. Local Processing</h3>
            <p className="leading-relaxed text-slate-600">
              All PDF splits, JPEG conversions, JSON formatting syntax checks, and interest EMI calculations are fully executed inside user-controlled browser contexts. We do not use transient temporary server databases for document storage.
            </p>
            <h3 className="text-md font-bold text-slate-800 mt-4">2. Cookies & Advertising</h3>
            <p className="leading-relaxed text-slate-600">
              We leverage safe third-party advertising structures (such as Google AdSense) to display promotional items, keeping our portal free. These advertising partners may use passive cookies to target contextual ads based on basic search terms. You can disable cookies inside standard browser configurations at any point.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-600" /> Terms of Service
            </h2>
            <p className="leading-relaxed text-slate-600">
              By accessing livetools.me, you agree to comply with standard acceptable use guidelines. All calculations outputs and formatted markup models are output under Creative Commons CC0 (Public Domain) regulations.
            </p>
            <h3 className="text-md font-bold text-slate-800">Limitations of Liability</h3>
            <p className="leading-relaxed text-slate-600">
              While we perform continuous mathematical syntax validations on our student, financial, and hash generators, results are returned on an "as-is" basis, without implicit uptime assurances. Users should verify high-critical values independently.
            </p>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-amber-600" /> Legal Disclaimer
            </h2>
            <p className="leading-relaxed text-slate-600">
              LiveTools.me is not an authorized financial advice provider, educational registrar, or certified legal counsel.
            </p>
            <p className="leading-relaxed text-slate-600">
              Loan amortization forecasts, SIP systematic plans, and tax evaluations are designed strictly as estimates. They do not constitute actual legal invoices, binding credit limits, or formal bank records. LiveTools holds zero responsibility over savings or trading strategies implemented based on estimates.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <button
        id="legal_back_home_btn"
        onClick={onBackToHome}
        className="text-xs bg-slate-100 hover:bg-slate-200 font-bold px-4 py-2 rounded-lg text-slate-700 transition"
      >
        ← Return to tools directory
      </button>

      <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-xs">
        {renderPageContent()}
      </div>
    </div>
  );
}
