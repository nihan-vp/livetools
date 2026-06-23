import React, { useState, useEffect } from 'react';
import {
  Search,
  Image as ImageIcon,
  FileText,
  Code,
  Calculator,
  AlignLeft,
  Search as SearchIcon,
  Share2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Download,
  Check,
  Menu,
  X
} from 'lucide-react';
import { ALL_TOOLS, CATEGORIES } from './data/tools';
import { Tool } from './types/tool';
import { ToolRenderer } from './components/ToolRenderer';
import { LegalPages } from './components/LegalPages';

export default function App() {
  // Routing simulation
  const [currentRoute, setCurrentRoute] = useState<{
    path: 'home' | 'tool' | 'legal';
    param: string;
  }>({ path: 'home', param: '' });

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sitemap download template simulation
  const [sitemapSuccess, setSitemapSuccess] = useState(false);

  // Read URL paths and hashes on mount to support dynamic links: /tools/[slug] or #/tools/[slug]
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      if (pathname.startsWith('/tools/')) {
        const slug = pathname.replace('/tools/', '').split('/')[0];
        const targetTool = ALL_TOOLS.find((t) => t.slug === slug);
        if (targetTool) {
          setCurrentRoute({ path: 'tool', param: slug });
          return;
        }
      }

      if (hash.startsWith('#/tools/')) {
        const slug = hash.replace('#/tools/', '');
        const targetTool = ALL_TOOLS.find((t) => t.slug === slug);
        if (targetTool) {
          setCurrentRoute({ path: 'tool', param: slug });
          return;
        }
      }

      const cleanPath = pathname.replace(/^\//, '').split('/')[0];
      if (['about', 'contact', 'privacy', 'terms', 'disclaimer'].includes(cleanPath)) {
        setCurrentRoute({ path: 'legal', param: cleanPath });
        return;
      }

      const cleanHash = hash.replace('#', '');
      if (['about', 'contact', 'privacy', 'terms', 'disclaimer'].includes(cleanHash)) {
        setCurrentRoute({ path: 'legal', param: cleanHash });
        return;
      }

      setCurrentRoute({ path: 'home', param: '' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // trigger on initial mount

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Professional Dynamic SEO Head Metadata Updates
  useEffect(() => {
    let title = 'LiveTools.me | Free Secure Online Utility Tools Portal (500+ Client-Side Tools)';
    let description = 'Run over 500+ secure, client-side online utility tools completely free offline. Perform image converters, PDF editors, developer syntax formatters, financial compound calculators, and word counters locally.';
    let keywords = 'free online tools, browser tools, local secure utilities, image compressor, pdf converter, gpa grade point, age calculator, emi installment calculations, crypto hash keys, json beautify format';
    let url = 'https://livetools.me';

    if (currentRoute.path === 'tool') {
      const activeTool = ALL_TOOLS.find((t) => t.slug === currentRoute.param);
      if (activeTool) {
        title = activeTool.metaTitle;
        description = activeTool.metaDescription;
        keywords = activeTool.keywords.join(', ');
        url = `https://livetools.me/tools/${activeTool.slug}`;
      }
    } else if (currentRoute.path === 'legal') {
      title = `${currentRoute.param.toUpperCase() || 'About Us'} - LiveTools.me Portal`;
      description = `Read our official ${currentRoute.param} documentation guidelines, data protection policies, and compliance matrices on LiveTools.me.`;
      url = `https://livetools.me/${currentRoute.param}`;
    }

    // Apply values directly to the primary layout DOM head
    document.title = title;

    const setMetaTag = (tagName: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${tagName}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, tagName);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    
    // Open Graph properties for search crawling index compatibility
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', url, true);

    // Twitter Card content
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [currentRoute]);

  const navigateToTool = (slug: string) => {
    if (slug) {
      window.history.pushState({}, '', `/tools/${slug}`);
      setCurrentRoute({ path: 'tool', param: slug });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute({ path: 'home', param: '' });
    }
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  const navigateToLegal = (type: string) => {
    window.history.pushState({}, '', `/${type}`);
    setCurrentRoute({ path: 'legal', param: type });
    setMobileMenuOpen(false);
  };

  // Icon selector helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Image':
        return <ImageIcon className="w-5 h-5 text-blue-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'Code':
        return <Code className="w-5 h-5 text-purple-500" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-emerald-500" />;
      case 'AlignLeft':
        return <AlignLeft className="w-5 h-5 text-amber-500" />;
      case 'Search':
        return <SearchIcon className="w-5 h-5 text-sky-500" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-indigo-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-orange-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  // Fast live search filter
  const filteredTools = ALL_TOOLS.filter((t) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return selectedCategory === 'all' ? true : t.category === selectedCategory;
    }
    return (
      t.name.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query) ||
      t.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  });

  // Limit on-screen rendering list to maintain high performance
  const displayLimit = searchQuery ? 12 : 24;
  const toolsToDisplay = filteredTools.slice(0, displayLimit);

  // Download Sitemap file directly client-side
  const handleDownloadSitemap = () => {
    const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    const staticUrls = `  <url>\n    <loc>https://livetools.me</loc>\n    <priority>1.0</priority>\n  </url>\n`;
    
    const dynamicUrls = ALL_TOOLS.map((t) => {
      return `  <url>\n    <loc>https://livetools.me/tools/${t.slug}</loc>\n    <priority>0.8</priority>\n  </url>`;
    }).join('\n');

    const sitemapFooter = `\n</urlset>`;
    const fullSitemap = sitemapHeader + staticUrls + dynamicUrls + sitemapFooter;

    const blob = new Blob([fullSitemap], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSitemapSuccess(true);
    setTimeout(() => setSitemapSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-blue-100">
      
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div id="navigation_container" className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div
            id="brand_logo_click"
            onClick={() => navigateToTool('')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-xs group-hover:bg-blue-700 transition">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none block">LiveTools</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest block uppercase mt-0.5">livetools.me</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block relative w-96">
            <div className="relative">
              <input
                id="header_search_input"
                type="text"
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                placeholder="Search across 500+ tools..."
                className="w-full text-slate-700 placeholder-slate-400 font-medium pl-10 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-full text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-slate-300 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </div>

            {/* Live Autocomplete dropdown */}
            {showSearchDropdown && searchQuery.trim() !== '' && (
              <div className="absolute top-11 left-0 right-0 max-h-80 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 divide-y divide-slate-100">
                {filteredTools.slice(0, 8).map((t) => (
                  <div
                    key={t.slug}
                    onClick={() => navigateToTool(t.slug)}
                    className="p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between group transition text-left"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">{t.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase">{t.category}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition" />
                  </div>
                ))}
                {filteredTools.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-400 font-mono">
                    No matching tools index found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <button id="nav_link_all_tools" onClick={() => { navigateToTool(''); setSelectedCategory('all'); }} className="hover:text-blue-600">Explore Directory</button>
            <button id="nav_link_categories" onClick={() => { navigateToTool(''); setSelectedCategory('Developer Tools'); }} className="hover:text-blue-600">Developer Tools</button>
            <button id="nav_link_about" onClick={() => navigateToLegal('about')} className="hover:text-blue-600">About Us</button>
            <button id="nav_link_contact" onClick={() => navigateToLegal('contact')} className="hover:text-blue-600">Contact</button>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              id="mobile_search_trigger"
              onClick={() => { navigateToTool(''); setSelectedCategory('all'); }}
              className="p-2 text-slate-500"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile_hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 border border-slate-100 bg-slate-50 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 p-4 space-y-4">
          <div className="relative">
            <input
              id="mobile_search_input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 500+ tools..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-full text-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
            <button id="mob_all" onClick={() => { navigateToTool(''); setMobileMenuOpen(false); setSelectedCategory('all'); }} className="p-2 bg-slate-50 rounded text-left">Explore Directory</button>
            <button id="mob_dev" onClick={() => { navigateToTool(''); setMobileMenuOpen(false); setSelectedCategory('Developer Tools'); }} className="p-2 bg-slate-50 rounded text-left">Dev Tools</button>
            <button id="mob_about" onClick={() => navigateToLegal('about')} className="p-2 bg-slate-50 rounded text-left">About Us</button>
            <button id="mob_contact" onClick={() => navigateToLegal('contact')} className="p-2 bg-slate-50 rounded text-left">Contact Us</button>
          </div>
        </div>
      )}

      {/* Main Contents layout */}
      <main className="flex-1 w-full">
        
        {/* Route 1: Home Dashboard */}
        {currentRoute.path === 'home' && (
          <div>
            
            {/* Elegant Hero Banner */}
            <section className="bg-white border-b border-slate-100 py-12 lg:py-16 text-center space-y-6">
              <div className="max-w-3xl mx-auto px-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> 100% Client-Side Privacy Enabled
                </div>
                <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Free and Secure <br className="hidden sm:inline" />
                  <span className="text-blue-600 bg-clip-text">Online Utility Tools</span> Platform
                </h2>
                <p className="text-sm lg:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Join millions of developers, engineers, and digital creators on LiveTools.me. Process image optimization, PDF splitters, cryptographic hashes, and mortgage rates securely on-device.
                </p>
              </div>

              {/* Central Search block */}
              <div className="max-w-xl mx-auto px-4 relative">
                <div className="relative shadow-md rounded-full bg-white border border-slate-200">
                  <input
                    id="hero_search_input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter keywords e.g. age-calculator, pdf, base64..."
                    className="w-full text-slate-700 pl-12 pr-6 py-3.5 rounded-full text-xs focus:outline-none"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-3.5" />
                </div>
              </div>
            </section>

            {/* Directory Section */}
            <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
              
              {/* Category selector chips */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    id="cat_btn_all"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${selectedCategory === 'all' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  >
                    All Tools ({ALL_TOOLS.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      id={`cat_btn_${cat.id}`}
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${selectedCategory === cat.name ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    >
                      {cat.name} ({ALL_TOOLS.filter(t => t.category === cat.name).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Grid layout for categories previews */}
              {selectedCategory === 'all' && !searchQuery && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CATEGORIES.map((cat) => (
                    <div
                      id={`bento_cat_${cat.id}`}
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-400 hover:shadow-xs transition group cursor-pointer text-left"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-50 group-hover:bg-blue-50 rounded-xl transition">
                          {getCategoryIcon(cat.icon)}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                          {cat.minToolsCount}+ Tools
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition truncate">{cat.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">{cat.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic scroll list of active filtered tools */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {searchQuery ? `Search results for "${searchQuery}"` : selectedCategory === 'all' ? 'Popular utilities' : `${selectedCategory}`} ({filteredTools.length} found)
                  </h3>
                  {selectedCategory !== 'all' && (
                    <button
                      id="reset_cat_btn"
                      onClick={() => setSelectedCategory('all')}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toolsToDisplay.map((t) => (
                    <div
                      id={`tool_card_${t.slug}`}
                      key={t.slug}
                      onClick={() => navigateToTool(t.slug)}
                      className="p-5 bg-white border border-slate-100 hover:border-blue-300 hover:shadow-xs transition rounded-2xl cursor-pointer text-left flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                            {t.category}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase font-mono">{t.toolType}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 truncate">{t.name}</h4>
                        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{t.shortDescription}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex justify-between items-center mt-4">
                        <span className="text-[11px] text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1">
                          Open Tool <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredTools.length > displayLimit && (
                  <div className="text-center pt-8">
                    <p className="text-xs text-slate-400 mb-2">Showing {displayLimit} of {filteredTools.length} total tools.</p>
                    <button
                      id="load_more_btn"
                      onClick={() => {
                        // Narrow selected queries or reveal on searching
                        setSearchQuery('');
                        alert('To browse full indexes, tap on individual bento category items above dynamically!');
                      }}
                      className="px-6 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-xs font-bold text-slate-700 transition"
                    >
                      Load More Items
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Google Indexing Sitemap tool export box */}
              <div className="p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="space-y-2 max-w-xl text-left">
                  <div className="inline-flex gap-1 items-center px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-full text-[10px] font-semibold border border-slate-700">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-green-400" /> SEO Indexing Optimizer active
                  </div>
                  <h3 className="font-extrabold text-lg md:text-xl">Google Webmaster Sitemap Compiler</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Generate, export, and download the full compliant `sitemap.xml` file containing all 500+ generated tool links instantly to jumpstart Google search index crawlers inside Vercel or VPS.
                  </p>
                </div>
                <button
                  id="download_sitemap_btn"
                  onClick={handleDownloadSitemap}
                  className="w-full md:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-full flex items-center justify-center gap-2 shrink-0 transition"
                >
                  {sitemapSuccess ? <Check className="w-4 h-4 text-green-600 animate-pulse" /> : <Download className="w-4 h-4" />}
                  {sitemapSuccess ? 'Sitemap Exported!' : 'Export sitemap.xml'}
                </button>
              </div>

            </section>

          </div>
        )}

        {/* Route 2: Active Tool page with Orchestrated SEO Content */}
        {currentRoute.path === 'tool' && (
          (() => {
            const activeTool = ALL_TOOLS.find((t) => t.slug === currentRoute.param);
            if (!activeTool) return <div className="p-12 text-center text-slate-500">Retrieving tool parameters...</div>;

            return (
              <ToolRenderer
                tool={activeTool}
                onNavigateToTool={navigateToTool}
                allTools={ALL_TOOLS}
              />
            );
          })()
        )}

        {/* Route 3: Legal informational pages */}
        {currentRoute.path === 'legal' && (
          <LegalPages
            pageType={currentRoute.param as any}
            onBackToHome={() => navigateToTool('')}
          />
        )}

      </main>

      {/* FOOTER BLOCK WITH BRANDING LINKS */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm leading-none block">LiveTools Platform</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Premium sandbox micro utilities platform. Converted and calculated with precision client-side protocols.
            </p>
          </div>

          <div className="space-y-2.5 text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top image elements</h4>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-semibold">
              <button onClick={() => navigateToTool('png-to-jpg')} className="hover:text-blue-600 text-left">PNG to JPG Compressor</button>
              <button onClick={() => navigateToTool('image-compressor')} className="hover:text-blue-600 text-left">Image Compressor</button>
              <button onClick={() => navigateToTool('image-color-picker')} className="hover:text-blue-600 text-left">Color Picker Canvas</button>
            </div>
          </div>

          <div className="space-y-2.5 text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top calculations</h4>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-semibold">
              <button onClick={() => navigateToTool('age-calculator')} className="hover:text-blue-600 text-left">Precision Age Calculator</button>
              <button onClick={() => navigateToTool('gst-calculator')} className="hover:text-blue-600 text-left">GST Tax Slab values</button>
              <button onClick={() => navigateToTool('emi-calculator')} className="hover:text-blue-600 text-left">Mortgage EMI Calculator</button>
            </div>
          </div>

          <div className="space-y-2.5 text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terms & Support</h4>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-semibold">
              <button onClick={() => navigateToLegal('about')} className="hover:text-blue-600 text-left">About Us</button>
              <button onClick={() => navigateToLegal('contact')} className="hover:text-blue-600 text-left">Contact support</button>
              <button onClick={() => navigateToLegal('privacy')} className="hover:text-blue-600 text-left">Privacy Policy</button>
              <button onClick={() => navigateToLegal('terms')} className="hover:text-blue-600 text-left">Terms & Service</button>
              <button onClick={() => navigateToLegal('disclaimer')} className="hover:text-blue-600 text-left">Legal Disclaimer</button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-400">
          <span>© 2026 LiveTools Corp. All calculations output CC0 permissive.</span>
          <span>Verified responsive in modern browsers. Made for timetables.</span>
        </div>
      </footer>

    </div>
  );
}
