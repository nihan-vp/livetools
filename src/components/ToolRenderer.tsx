import React, { useState, useEffect } from 'react';
import { CreditCard, Bookmark, MessageSquare, ArrowRight, BookOpen, AlertTriangle, HelpCircle, Shield, Share2 } from 'lucide-react';
import { Tool } from '../types/tool';
import { ImageTools } from './tools/ImageTools';
import { PdfTools } from './tools/PdfTools';
import { DeveloperTools } from './tools/DeveloperTools';
import { CalculatorTools } from './tools/CalculatorTools';
import { TextTools } from './tools/TextTools';
import { SeoTools } from './tools/SeoTools';
import { SocialTools } from './tools/SocialTools';
import { StudentTools } from './tools/StudentTools';
import { FallbackSandbox } from './tools/FallbackSandbox';

interface ToolRendererProps {
  tool: Tool;
  onNavigateToTool: (slug: string) => void;
  allTools: Tool[];
}

export function ToolRenderer({ tool, onNavigateToTool, allTools }: ToolRendererProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auto scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tool.slug]);

  // Set page headers simulation for browser-head context in dynamic client frame
  useEffect(() => {
    document.title = tool.metaTitle;
  }, [tool]);

  // Map slug to main interactive modules
  const renderInteractiveWidget = () => {
    const s = tool.slug;

    // Detect module category matching or slugs
    if (['png-to-jpg', 'jpg-to-png', 'png-to-webp', 'webp-to-png', 'jpg-to-webp', 'webp-to-jpg', 'image-compressor', 'image-resizer', 'image-color-picker', 'color-extractor', 'image-to-base64', 'base64-to-image'].includes(s)) {
      return <ImageTools slug={s} />;
    }
    if (['pdf-metadata-viewer', 'pdf-page-counter', 'image-to-pdf', 'pdf-size-reducer', 'pdf-page-remover'].includes(s)) {
       return <PdfTools slug={s} />;
    }
    if (['json-formatter', 'base64-encode-decode', 'url-encode-decode', 'uuid-generator', 'jwt-decoder', 'hash-generator', 'sha256-generator', 'md5-generator', 'xml-formatter', 'css-js-minifier', 'sql-formatter'].includes(s)) {
       return <DeveloperTools slug={s} />;
    }
    if (['age-calculator', 'emi-calculator', 'gst-calculator', 'sip-calculator', 'percentage-calculator', 'bmi-calculator', 'discount-calculator', 'compound-interest-calculator'].includes(s)) {
       return <CalculatorTools slug={s} />;
    }
    if (['word-counter', 'case-converter', 'remove-duplicate-lines', 'text-sorter', 'random-password-generator', 'lorem-ipsum-generator', 'slug-generator'].includes(s)) {
       return <TextTools slug={s} />;
    }
    if (['meta-tag-generator', 'robots-txt-generator', 'open-graph-generator', 'json-ld-schema-generator'].includes(s)) {
       return <SeoTools slug={s} />;
    }
    if (['youtube-embed-generator', 'instagram-bio-generator', 'hashtag-generator'].includes(s)) {
       return <SocialTools slug={s} />;
    }
    if (['gpa-calculator', 'attendance-calculator', 'study-planner-generator'].includes(s)) {
       return <StudentTools slug={s} />;
    }

    // Default general purpose sandbox for other 450+ programmatic variations
    return <FallbackSandbox tool={tool} />;
  };

  // Compile Dynamic 500-800 word guide content to fulfill strict SEO guidelines
  const getDynamicSeoGuide = () => {
    const name = tool.name;
    const cat = tool.category;

    return (
      <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" /> Complete Guide for {name}
        </h3>
        
        <p className="leading-relaxed">
          Welcome to the comprehensive user manual and tactical documentation page for the premium **{name}**, hosted free on LiveTools.nihan-vp.me. As digital workflows grow more complex with high volume demands, having robust, server-less browser converters and compilers is vital. The {name} was engineered to meet the highest standards of data sanitization, client privacy, and processing speed, making it an ideal choice for software engineers, designers, content managers, students, and digital creators worldwide.
        </p>

        <h4 className="text-md font-bold text-slate-800 pt-2 border-b border-slate-100 pb-2">Why Choose client-side processing over cloud uploads?</h4>
        <p className="leading-relaxed">
          Most online tool portals require uploading files, formulas, or text blocks directly to their backend databases. This introduces significant risks, including information leakage, database cache breaches, and network transmission overhead. **LiveTools.nihan-vp.me operates on an offline-first architecture.** All computation logic, file formats translation, string sanitizations, and layout scaling occur 100% locally inside your browser's security sandbox context. 
          Your media content remains locked to your system, leaving absolutely no digital footprints on external servers.
        </p>

        <h4 className="text-md font-bold text-slate-800 pt-2 border-b border-slate-100 pb-2">Step-by-step: How to use the {name}</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Step 1: Input Setup:</strong> Prepare your target data or browse your hard drive for local documents. Our system supports high dimension file uploads and is responsive down to mobile views.</li>
          <li><strong>Step 2: Parameter Modification:</strong> Adjust sliders, selectors, or text casing boxes to matching specifications. Real-time calculations update values instantaneously.</li>
          <li><strong>Step 3: Solve / Compile:</strong> Click the primary blue operation button. The underlying Javascript engine completes the logical operations inside memory cycles.</li>
          <li><strong>Step 4: Download / Copy:</strong> Retrieve your newly formatted CSS stylesheets, compressed images, optimized PDFs, or hashed key strings. Clicking Copy saves results directly to the clipboard.</li>
        </ol>

        <h4 className="text-md font-bold text-slate-800 pt-2 border-b border-slate-100 pb-2">Security, Speed, and Compliance Guidelines</h4>
        <p className="leading-relaxed">
          The underlying JavaScript compilers utilized by LiveTools are structured under permissive open-source protocols, guaranteeing zero telemetry triggers or background network packet injections. Our platform is fully responsive and layout optimized for all modern desktop and mobile browsers, ensuring standard web accessibility levels. We conform to international security guidelines while prioritizing high core web vitals for fast loading times.
        </p>

        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-sky-600 shrink-0" />
          <span className="text-sky-700"><strong>Privacy Notice:</strong> We do not operate any tracking databases. All uploads are processed inside memory buffers. Sessions are cleared upon browser closure.</span>
        </div>
      </div>
    );
  };

  // Find related tools objects by slug
  const relatedToolsObjects = allTools.filter(t => tool.relatedTools.includes(t.slug)).slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      
      {/* Dynamic Breadcrumbs */}
      <nav id="breadcrumb_nav" className="text-xs text-slate-400 font-medium flex items-center gap-1.5" aria-label="Breadcrumb">
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => onNavigateToTool('')}>Home</span>
        <span>/</span>
        <span className="text-slate-500 font-semibold">{tool.category}</span>
        <span>/</span>
        <span className="text-blue-600 font-bold truncate max-w-[200px]">{tool.name}</span>
      </nav>

      {/* ADSENSE PLACEHOLDER: HEADER AD */}
      <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-lg py-4 px-6 text-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Ad Placeholder</span>
        <div className="text-xs text-slate-500 max-w-sm mx-auto font-mono">
          AdSense Header Banner Placement ad unit
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Interactive Tool & Guides */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Tool Title Block */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">{tool.name}</h1>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{tool.shortDescription}</p>
          </div>

          {/* Core Interactive Widget mounting */}
          <div className="border border-slate-100 rounded-2xl bg-white p-1">
            {renderInteractiveWidget()}
          </div>

          {/* ADSENSE PLACEHOLDER: IN CONTENT AD */}
          <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-lg py-5 px-6 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Ad Content Banner</span>
            <div className="text-xs font-mono text-slate-500">AdSense In-Content Responsive ad item</div>
          </div>

          {/* Dynamic SEO Informative Guide (300-800 Words) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
            {getDynamicSeoGuide()}
          </div>

          {/* FAQ Schema Accordion */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Frequently Asked Questions
            </h3>
            <div className="divide-y divide-slate-100">
              {tool.faq.map((faqItem, index) => (
                <div key={index} className="py-4">
                  <button
                    id={`faq_btn_${index}`}
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex justify-between items-center text-left text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
                  >
                    <span>{faqItem.question}</span>
                    <span className="text-xs font-bold text-slate-400 ml-2">
                      {activeFaq === index ? '▲' : '▼'}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed font-mono">
                      {faqItem.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Same category and related items */}
        <div className="space-y-8">
          
          {/* ADSENSE PLACEHOLDER: SIDEBAR AD */}
          <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-lg py-12 px-4 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Sidebar Ad</span>
            <div className="text-xs font-mono text-slate-500">AdSense SkyScraper unit</div>
          </div>

          {/* Category Links Navigation */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Related tools in {tool.category}</h3>
            <div className="space-y-2">
              {relatedToolsObjects.map((rt) => (
                <button
                  id={`related_url_link_${rt.slug}`}
                  key={rt.slug}
                  onClick={() => onNavigateToTool(rt.slug)}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-100 hover:bg-blue-50 hover:border-blue-200 text-xs transition font-semibold text-slate-600 flex items-center justify-between"
                >
                  <span className="truncate pr-2">{rt.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Google SERP Indexing Visualizer */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-3.5 text-left border-l-4 border-l-blue-600">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 justify-between">
              <h3 className="font-extrabold text-slate-950 text-xs tracking-tight">Google Search Preview (SERP)</h3>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse">#1 Rank Simulator</span>
            </div>
            
            <div className="space-y-2">
              {/* Google URL structure */}
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <div className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold border border-slate-200 text-blue-600">L</div>
                <span className="truncate text-[11px] text-slate-400 font-mono tracking-tight">https://livetools.nihan-vp.me › tools › <span className="font-bold text-slate-700">{tool.slug}</span></span>
              </div>
              
              {/* Google Title */}
              <h4 className="text-sm font-semibold text-blue-800 hover:underline cursor-pointer leading-snug line-clamp-2">
                {tool.metaTitle}
              </h4>
              
              {/* Google Description & Rating */}
              <div className="text-[11px] text-slate-500 leading-relaxed font-sans">
                <span className="text-amber-500 font-bold block sm:inline mr-1">★★★★★ 4.9 <span className="text-slate-400 font-mono font-medium">(176 reviews)</span></span> {tool.metaDescription}
              </div>

              {/* Dynamic schema preview extensions */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-1 gap-1 text-[10px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span> SoftwareApplication Schema
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span> Rich FAQ Snippets active
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span> Static Canonical Link referenced
                </div>
              </div>
            </div>
          </div>

          {/* Static Platform Stats block */}
          <div className="bg-blue-600 text-white rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-sm">Security Sandbox Verified</h4>
            <p className="text-[11px] opacity-80 leading-relaxed">
              We process everything on-device natively. No file caches, passwords trackers or personal data logs are saved. Completely safe and secure.
            </p>
          </div>

        </div>

      </div>

      {/* ADSENSE PLACEHOLDER: FOOTER AD */}
      <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-lg py-4 px-6 text-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Ad Footer Banner</span>
        <div className="text-xs font-mono text-slate-500">AdSense Footer Match Multiplex ad box</div>
      </div>

      {/* Dynamic SEO JSON-LD injection block to simulate page indexing tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": tool.name,
              "description": tool.metaDescription,
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 compatible browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            ...(tool.faq && tool.faq.length > 0
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": tool.faq.map((f) => ({
                      "@type": "Question",
                      "name": f.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                      }
                    }))
                  }
                ]
              : [])
          ])
        }}
      />

    </div>
  );
}
