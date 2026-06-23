import React, { useState } from 'react';
import { Search, Copy, Check, Terminal, FileCheck, Code } from 'lucide-react';

interface SeoToolProps {
  slug: string;
}

export function SeoTools({ slug }: SeoToolProps) {
  const [copied, setCopied] = useState(false);
  const [outputText, setOutputText] = useState('');

  // 1. Meta tag inputs
  const [title, setTitle] = useState('My Online Blog Website');
  const [desc, setDesc] = useState('Explore active online tools and daily math helpers on my secure web directory.');
  const [keywords, setKeywords] = useState('online, calculators, converters');
  const [author, setAuthor] = useState('Webmaster');

  // 2. Robots direct entries
  const [allowCrawl, setAllowCrawl] = useState('Googlebot');
  const [sitemapLink, setSitemapLink] = useState('https://livetools.nihan-vp.me/sitemap.xml');

  // 3. Open Graph image URL
  const [ogUrl, setOgUrl] = useState('https://livetools.nihan-vp.me');
  const [ogImage, setOgImage] = useState('https://livetools.nihan-vp.me/assets/hero.jpg');

  // 4. Schema markup inputs
  const [bizName, setBizName] = useState('Global LiveTools Corp');
  const [bizAddress, setBizAddress] = useState('San Francisco, CA');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compileMetaTags = () => {
    const meta = `<!-- Global SEO Header Tags -->
<title>${title}</title>
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="index, follow" />`;
    setOutputText(meta);
  };

  const compileRobotsTxt = () => {
    const robots = `# Robots.txt Index Guideline Instructions
User-agent: *
Disallow: /admin/
Disallow: /api/

User-agent: ${allowCrawl}
Allow: /

Sitemap: ${sitemapLink}`;
    setOutputText(robots);
  };

  const compileOpenGraph = () => {
    const og = `<!-- Rich Open Graph Social Metadata -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${ogUrl}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:site_name" content="LiveTools" />

<!-- Twitter Social Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${ogImage}" />`;
    setOutputText(og);
  };

  const compileJsonLdSchema = () => {
    const schema = `{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "${bizName}",
  "url": "${ogUrl}",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 compatible browser",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${bizAddress}"
  },
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  }
}`;
    setOutputText(schema);
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        
        {/* Forms Input Parameters panel */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" /> SEO direct tag compiler
          </h3>

          {/* META TAGS FORM */}
          {slug === 'meta-tag-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Webpage Title (SEO)</label>
                <input
                  id="seo_title_input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Meta Description</label>
                <textarea
                  id="seo_desc_textarea"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full h-16 p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Keywords csv</label>
                  <input
                    id="seo_keywords_input"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Owner Author</label>
                  <input
                    id="seo_author_input"
                    type="text"
                    value={author}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
              <button
                id="generate_meta_btn"
                onClick={compileMetaTags}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Compile HTML Header Tags
              </button>
            </div>
          )}

          {/* ROBOTS DIRECTS */}
          {slug === 'robots-txt-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Robot Crawler</label>
                <select
                  id="robots_crawler_select"
                  value={allowCrawl}
                  onChange={(e) => setAllowCrawl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="*">All standard engines (*)</option>
                  <option value="Googlebot">Google Web crawling engine</option>
                  <option value="Bingbot">Bing crawling crawler</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Indexable Sitemap Link</label>
                <input
                  id="robots_sitemap_url"
                  type="text"
                  value={sitemapLink}
                  onChange={(e) => setSitemapLink(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <button
                id="generate_robots_btn"
                onClick={compileRobotsTxt}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Compile robots.txt directives
              </button>
            </div>
          )}

          {/* OPEN GRAPH SOCIALS */}
          {slug === 'open-graph-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Root URL</label>
                <input
                  id="og_canonical_url"
                  type="text"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Banner Placement Asset Social Image</label>
                <input
                  id="og_image_url"
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <button
                id="generate_og_btn"
                onClick={compileOpenGraph}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Compile Facebook & Twitter Social Meta
              </button>
            </div>
          )}

          {/* SCHEMA CONFIGS */}
          {slug === 'json-ld-schema-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Product application name</label>
                <input
                  id="schema_app_name"
                  type="text"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Address Location</label>
                <input
                  id="schema_app_loc"
                  type="text"
                  value={bizAddress}
                  onChange={(e) => setBizAddress(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <button
                id="generate_schema_btn"
                onClick={compileJsonLdSchema}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Compile JSON-LD Structured Data
              </button>
            </div>
          )}

          {/* DEFAULT ACTION ON GENERAL SEO SITES */}
          {!['meta-tag-generator', 'robots-txt-generator', 'open-graph-generator', 'json-ld-schema-generator'].includes(slug) && (
            <div className="space-y-3 pt-6 text-center text-slate-400 font-mono text-xs">
              This SEO tag editor auto-indexes your parameters in Google. Fill values or generate schemas.
            </div>
          )}
        </div>

        {/* Output Previews */}
        <div className="relative">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase mb-1">
            <span>Resulting Tag structures</span>
            {outputText && (
              <button
                id="copy_seo_output_btn"
                onClick={() => handleCopy(outputText)}
                className="text-xs text-blue-600 font-bold hover:text-blue-800"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            id="seo_output_textarea"
            readOnly
            value={outputText}
            className="w-full h-72 p-3 bg-slate-900 text-slate-200 border border-slate-800 rounded-xl font-mono text-[11px] leading-relaxed focus:outline-none"
            placeholder="SEO parameters print out here. Fill form inputs and click compiler."
          />
        </div>
      </div>
    </div>
  );
}
