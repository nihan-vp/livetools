import * as fs from 'fs';
import * as path from 'path';
import { ALL_TOOLS, CATEGORIES } from '../src/data/tools';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.resolve(DIST_DIR, 'index.html');

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function processTemplate(
  template: string,
  title: string,
  desc: string,
  keywords: string,
  url: string,
  schemas: any[],
  bodyHtml: string
): string {
  let html = template;

  // Replace Title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Replace Description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(desc)}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(desc)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(desc)}" />`);

  // Replace Title for OG/Twitter
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);

  // Replace Keywords
  html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${escapeHtml(keywords)}" />`);

  // Replace URL/Canonical
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(url)}" />`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeHtml(url)}" />`);

  // Inject Schemas
  const schemaScript = `  <script type="application/ld+json">\n${JSON.stringify(schemas, null, 2)}\n  </script>\n</head>`;
  html = html.replace(/<\/head>/i, schemaScript);

  // Inject Body HTML inside root div
  html = html.replace(/<div\s+id="root">\s*<\/div>/i, `<div id="root">${bodyHtml}</div>`);

  return html;
}

const legalPagesData: Record<string, { title: string; desc: string; content: string }> = {
  about: {
    title: 'About Us - LiveTools.me Portal',
    desc: 'Read our official about documentation guidelines, data protection policies, and compliance matrices on LiveTools.me.',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">About LiveTools</h2>
        <p class="leading-relaxed text-slate-600">
          LiveTools.me is committed to being the internet's largest, fastest, and most secure collection of high-utility browser tools. Our direct goal is to supply essential conversion, calculation, formatting, and optimization algorithms completely client-side.
        </p>
        <p class="leading-relaxed text-slate-600">
          By shifting the execution burden from dense, cloud-hosted server containers directly onto standard browser JavaScript compilers, we provide instant operations with absolute privacy limits. We do not store log variables, file uploads, passwords, or transaction structures.
        </p>
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 space-y-1.5">
          <span class="text-xs font-bold text-blue-800 flex items-center gap-1.5">Core Technical Philosophies</span>
          <ul class="list-disc pl-5 text-xs space-y-1">
            <li>100% Secure offline browser execution.</li>
            <li>Instant response latency times (zero queue delays).</li>
            <li>Zero membership or subscription barriers.</li>
            <li>Fully optimized lightweight layouts.</li>
          </ul>
        </div>
      </div>
    `
  },
  contact: {
    title: 'Contact Support Team - LiveTools.me Portal',
    desc: 'Have feature proposals, custom tools recommendation, or feedback queries? Get in touch with our web administration group.',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">Contact Support Team</h2>
        <p class="leading-relaxed text-slate-600">
          Have feature proposals, custom tools recommendation, or feedback queries? Get in touch with our web administration group:
        </p>
        <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-mono text-xs text-slate-700">
          <div class="flex justify-between items-center border-b border-slate-200 pb-2">
            <span>Support Desk Email:</span>
            <span class="font-bold text-slate-800">support@livetools.me</span>
          </div>
          <div class="flex justify-between items-center border-b border-slate-200 pb-2">
            <span>Response Target:</span>
            <span class="font-bold text-slate-800">Within 24 Hours</span>
          </div>
          <div class="flex justify-between items-center">
            <span>API integrations requests:</span>
            <span class="font-bold text-slate-800">manzclinicppm@gmail.com</span>
          </div>
        </div>
      </div>
    `
  },
  privacy: {
    title: 'Privacy Policy - LiveTools.me Portal',
    desc: 'Read our official privacy guidelines, offline database storage declarations, and data protection policies on LiveTools.me.',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">Privacy Policy</h2>
        <p class="leading-relaxed text-slate-600 text-xs text-slate-400">Last updated: June 4, 2026</p>
        <p class="leading-relaxed text-slate-600">
          We highly respect user transparency borders. Our fundamental policy is simple: <strong>we do not request, track, or save any personal entries</strong>.
        </p>
        <h3 class="text-md font-bold text-slate-800 mt-4">1. Local Processing</h3>
        <p class="leading-relaxed text-slate-600">
          All PDF splits, JPEG conversions, JSON formatting syntax checks, and interest EMI calculations are fully executed inside user-controlled browser contexts. We do not use transient temporary server databases for document storage.
        </p>
        <h3 class="text-md font-bold text-slate-800 mt-4">2. Cookies & Advertising</h3>
        <p class="leading-relaxed text-slate-600">
          We leverage safe third-party advertising structures (such as Google AdSense) to display promotional items, keeping our portal free. These advertising partners may use passive cookies to target contextual ads based on basic search terms. You can disable cookies inside standard browser configurations at any point.
        </p>
      </div>
    `
  },
  terms: {
    title: 'Terms of Service - LiveTools.me Portal',
    desc: 'Review the official terms of use, CC0 permissive outputs, and legal licensing parameters of LiveTools.me.',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">Terms of Service</h2>
        <p class="leading-relaxed text-slate-600">
          By accessing livetools.me, you agree to comply with standard acceptable use guidelines. All calculations outputs and formatted markup models are output under Creative Commons CC0 (Public Domain) regulations.
        </p>
        <h3 class="text-md font-bold text-slate-800">Limitations of Liability</h3>
        <p class="leading-relaxed text-slate-600">
          While we perform continuous mathematical syntax validations on our student, financial, and hash generators, results are returned on an "as-is" basis, without implicit uptime assurances. Users should verify high-critical values independently.
        </p>
      </div>
    `
  },
  disclaimer: {
    title: 'Legal Disclaimer - LiveTools.me Portal',
    desc: 'Read the official liability limits, financial advice disclaimers, and warranty parameters of LiveTools.me.',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-2">Legal Disclaimer</h2>
        <p class="leading-relaxed text-slate-600">
          LiveTools.me is not an authorized financial advice provider, educational registrar, or certified legal counsel.
        </p>
        <p class="leading-relaxed text-slate-600">
          Loan amortization forecasts, SIP systematic plans, and tax evaluations are designed strictly as estimates. They do not constitute actual legal invoices, binding credit limits, or formal bank records. LiveTools holds zero responsibility over savings or trading strategies implemented based on estimates.
        </p>
      </div>
    `
  }
};

function buildLegalBody(innerContent: string): string {
  return `
    <div class="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <header class="bg-white border-b border-slate-100 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2">
            <div class="bg-blue-600 text-white p-2 rounded-xl">
              <span class="font-bold">L</span>
            </div>
            <div>
              <span class="font-extrabold text-lg text-slate-900 tracking-tight block">LiveTools</span>
              <span class="text-[10px] text-slate-400 font-bold block uppercase">livetools.me</span>
            </div>
          </a>
          <nav class="flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="/" class="hover:text-blue-600">Explore Directory</a>
            <a href="/about" class="hover:text-blue-600">About Us</a>
            <a href="/contact" class="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>
      <main class="max-w-3xl mx-auto px-4 py-12 space-y-8 flex-1 w-full">
        <a href="/" class="text-xs bg-slate-100 hover:bg-slate-200 font-bold px-4 py-2 rounded-lg text-slate-700 transition">
          ← Return to tools directory
        </a>
        <div class="bg-white border border-slate-100 p-8 rounded-2xl shadow-xs">
          ${innerContent}
        </div>
      </main>
      <footer class="bg-white border-t border-slate-100 py-12 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center text-[10px] font-mono text-slate-400">
          © 2026 LiveTools Corp. All calculations output CC0 permissive.
        </div>
      </footer>
    </div>
  `;
}

function run() {
  console.log('Starting static site pre-rendering process...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: Template index.html not found at ${TEMPLATE_PATH}. Run "npm run build" first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  // 1. PRE-RENDER ALL 500+ DYNAMIC TOOLS
  console.log(`Pre-rendering ${ALL_TOOLS.length} tool pages...`);
  ALL_TOOLS.forEach((tool, index) => {
    const toolUrl = `https://livetools.me/tools/${tool.slug}`;
    const toolDir = path.resolve(DIST_DIR, 'tools', tool.slug);
    
    if (!fs.existsSync(toolDir)) {
      fs.mkdirSync(toolDir, { recursive: true });
    }

    const schemas = [
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
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://livetools.me/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": tool.category,
            "item": "https://livetools.me/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tool.name,
            "item": toolUrl
          }
        ]
      }
    ];

    if (tool.faq && tool.faq.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": tool.faq.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        })) as any
      });
    }

    // Build the pre-rendered body html
    const relatedHtml = tool.relatedTools
      .map((slug) => {
        const rt = ALL_TOOLS.find((t) => t.slug === slug);
        if (!rt) return '';
        return `
          <a href="/tools/${rt.slug}" class="block w-full text-left p-2.5 rounded-lg border border-slate-100 hover:bg-blue-50 hover:border-blue-200 text-xs transition font-semibold text-slate-600">
            ${rt.name}
          </a>
        `;
      })
      .join('');

    const bodyHtml = `
      <div class="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
        <header class="bg-white border-b border-slate-100 shadow-xs">
          <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
              <div class="bg-blue-600 text-white p-2 rounded-xl">
                <span class="font-bold">L</span>
              </div>
              <div>
                <span class="font-extrabold text-lg text-slate-900 tracking-tight block">LiveTools</span>
                <span class="text-[10px] text-slate-400 font-bold block uppercase">livetools.me</span>
              </div>
            </a>
            <nav class="flex items-center gap-6 text-xs font-bold text-slate-600">
              <a href="/" class="hover:text-blue-600">Explore Directory</a>
              <a href="/about" class="hover:text-blue-600">About Us</a>
              <a href="/contact" class="hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </header>

        <main class="flex-1 w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
          <nav class="text-xs text-slate-400 font-medium flex items-center gap-1.5" aria-label="Breadcrumb">
            <a href="/" class="hover:text-blue-600">Home</a>
            <span>/</span>
            <span class="text-slate-500 font-semibold">${tool.category}</span>
            <span>/</span>
            <span class="text-blue-600 font-bold">${tool.name}</span>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div class="lg:col-span-3 space-y-8">
              <div>
                <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">${tool.name}</h1>
                <p class="text-sm text-slate-500 mt-1.5 leading-relaxed">${tool.shortDescription}</p>
              </div>

              <div class="border border-slate-200 border-dashed rounded-2xl bg-white p-12 text-center space-y-4">
                <div class="max-w-md mx-auto space-y-2">
                  <h2 class="text-lg font-bold text-slate-800">Secure On-Device Processor</h2>
                  <p class="text-xs text-slate-500">To load and execute the interactive version of this tool, please enable JavaScript in your browser settings. All processing is executed 100% locally in your browser memory for absolute privacy protection.</p>
                </div>
              </div>

              <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
                <h2 class="text-xl font-bold text-slate-800">Complete Guide & Tutorial for ${tool.name}</h2>
                <p class="text-sm text-slate-600 leading-relaxed">${tool.longDescription}</p>
                
                <h3 class="text-md font-bold text-slate-800 pt-2 border-b border-slate-100 pb-2">Why client-side processing on LiveTools.me?</h3>
                <p class="text-sm text-slate-600 leading-relaxed">
                  Standard web apps upload your sensitive data, images, code files, or interest calculations to remote servers. This risks potential leaks, data storage logs, and compliance breaches. With the **${tool.name}**, your assets never leave your machine. The execution runs fully offline-first in memory buffers, conforming to highest digital privacy expectations.
                </p>

                <h3 class="text-md font-bold text-slate-800 pt-2 border-b border-slate-100 pb-2">Step-by-Step Instructions</h3>
                <ol class="list-decimal pl-5 text-sm text-slate-600 space-y-2">
                  <li><strong>Prepare Input:</strong> Add your values, text strings, or drag-and-drop file layouts into the dashboard container.</li>
                  <li><strong>Adjust Settings:</strong> Tune parameter configurations, ranges, formats, or casing filters as needed.</li>
                  <li><strong>Process Locally:</strong> Click the execution button. The built-in Javascript functions compute the result dynamically.</li>
                  <li><strong>Save output:</strong> Save compiled files, download PNGs/PDFs, or copy results directly to clipboard.</li>
                </ol>
              </div>

              <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4">
                <h2 class="text-lg font-bold text-slate-800">Frequently Asked Questions (FAQ)</h2>
                <div class="divide-y divide-slate-100">
                  ${tool.faq
                    .map(
                      (f) => `
                    <div class="py-4 space-y-1.5">
                      <h3 class="text-sm font-semibold text-slate-700">${f.question}</h3>
                      <p class="text-xs text-slate-500 leading-relaxed">${f.answer}</p>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            </div>

            <div class="space-y-8">
              <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 class="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Related tools in ${tool.category}</h3>
                <div class="space-y-2">
                  ${relatedHtml}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer class="bg-white border-t border-slate-100 py-12 mt-12">
          <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-4 text-left">
              <span class="font-extrabold text-slate-900 text-sm block">LiveTools Platform</span>
              <p class="text-[11px] text-slate-400 leading-relaxed">Premium sandbox micro utilities platform. Converted and calculated with precision client-side protocols.</p>
            </div>
            <div class="space-y-2.5 text-left">
              <h4 class="text-xs font-bold text-slate-400 uppercase">Privacy & Support</h4>
              <div class="flex flex-col gap-1.5 text-xs text-slate-500">
                <a href="/about" class="hover:text-blue-600">About Us</a>
                <a href="/contact" class="hover:text-blue-600">Contact Support</a>
                <a href="/privacy" class="hover:text-blue-600">Privacy Policy</a>
                <a href="/terms" class="hover:text-blue-600">Terms & Service</a>
                <a href="/disclaimer" class="hover:text-blue-600">Legal Disclaimer</a>
              </div>
            </div>
          </div>
          <div class="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-100 text-[10px] font-mono text-slate-400 text-center">
            © 2026 LiveTools Corp. All calculations output CC0 permissive.
          </div>
        </footer>
      </div>
    `;

    const outputHtml = processTemplate(
      template,
      tool.metaTitle,
      tool.metaDescription,
      tool.keywords.join(', '),
      toolUrl,
      schemas,
      bodyHtml
    );

    fs.writeFileSync(path.resolve(toolDir, 'index.html'), outputHtml, 'utf8');
  });

  // 2. PRE-RENDER ALL LEGAL PAGES
  console.log('Pre-rendering legal pages...');
  Object.keys(legalPagesData).forEach((pageName) => {
    const page = legalPagesData[pageName];
    const pageDir = path.resolve(DIST_DIR, pageName);
    
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": page.title,
        "description": page.desc,
        "url": `https://livetools.me/${pageName}`
      }
    ];

    const bodyHtml = buildLegalBody(page.content);
    const outputHtml = processTemplate(
      template,
      page.title,
      page.desc,
      'legal terms, privacy policies, data protection guidelines, support contact, livetools info',
      `https://livetools.me/${pageName}`,
      schemas,
      bodyHtml
    );

    fs.writeFileSync(path.resolve(pageDir, 'index.html'), outputHtml, 'utf8');
  });

  // 3. PRE-RENDER THE HOMEPAGE WITH FULL crawl-directory
  console.log('Pre-rendering homepage with full directory lists...');
  const homeTitle = 'LiveTools.me | Free Secure Online Utility Tools Portal (500+ Client-Side Tools)';
  const homeDesc = 'Run over 500+ secure, client-side online utility tools completely free offline. Perform image converters, PDF editors, developer syntax formatters, financial compound calculators, and word counters locally.';
  const homeKeywords = 'free online tools, browser tools, local secure utilities, image compressor, pdf converter, gpa grade point, age calculator, emi installment calculations, crypto hash keys, json beautify format';

  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "LiveTools",
      "url": "https://livetools.me/",
      "description": homeDesc,
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://livetools.me/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LiveTools",
      "url": "https://livetools.me/",
      "logo": "https://livetools.me/assets/logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "LiveTools Catalog",
      "description": "Complete collection of free secure online client-side utility tools.",
      "numberOfItems": ALL_TOOLS.length,
      "itemListElement": ALL_TOOLS.map((t, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://livetools.me/tools/${t.slug}`,
        "name": t.name
      }))
    }
  ];

  const homeBodyHtml = `
    <div class="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <header class="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2">
            <div class="bg-blue-600 text-white p-2 rounded-xl">
              <span class="font-bold">L</span>
            </div>
            <div>
              <span class="font-extrabold text-lg text-slate-900 tracking-tight block">LiveTools</span>
              <span class="text-[10px] text-slate-400 font-bold block uppercase">livetools.me</span>
            </div>
          </a>
          <nav class="flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="/" class="hover:text-blue-600">Explore Directory</a>
            <a href="/about" class="hover:text-blue-600">About Us</a>
            <a href="/contact" class="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      <main class="flex-1 w-full">
        <section class="bg-white border-b border-slate-100 py-12 lg:py-16 text-center space-y-6">
          <div class="max-w-3xl mx-auto px-4 space-y-4">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
              100% Client-Side Privacy Enabled
            </div>
            <h2 class="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Free and Secure <br class="hidden sm:inline" />
              <span class="text-blue-600 bg-clip-text">Online Utility Tools</span> Platform
            </h2>
            <p class="text-sm lg:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Run over 500+ secure, client-side online utility tools completely free offline. Perform image converters, PDF editors, developer syntax formatters, financial compound calculators, and word counters locally.
            </p>
          </div>
        </section>

        <section class="max-w-7xl mx-auto px-4 py-12 space-y-12">
          <h3 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Browse All 500+ Utility Tools</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${CATEGORIES.map((cat) => {
              const catTools = ALL_TOOLS.filter((t) => t.category === cat.name);
              return `
                <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4 text-left">
                  <div class="border-b border-slate-100 pb-3">
                    <h4 class="font-extrabold text-slate-900 text-base">${cat.name}</h4>
                    <p class="text-xs text-slate-400 mt-1">${cat.description}</p>
                  </div>
                  <ul class="space-y-2 max-h-80 overflow-y-auto pr-1">
                    ${catTools
                      .map(
                        (t) => `
                      <li>
                        <a href="/tools/${t.slug}" class="block text-xs font-semibold text-slate-600 hover:text-blue-600 truncate">
                          ${t.name}
                        </a>
                      </li>
                    `
                      )
                      .join('')}
                  </ul>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      </main>

      <footer class="bg-white border-t border-slate-100 py-12 mt-12">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-4 text-left">
            <span class="font-extrabold text-slate-900 text-sm block">LiveTools Platform</span>
            <p class="text-[11px] text-slate-400 leading-relaxed">Premium sandbox micro utilities platform. Converted and calculated with precision client-side protocols.</p>
          </div>
          <div class="space-y-2.5 text-left">
            <h4 class="text-xs font-bold text-slate-400 uppercase">Privacy & Support</h4>
            <div class="flex flex-col gap-1.5 text-xs text-slate-500">
              <a href="/about" class="hover:text-blue-600">About Us</a>
              <a href="/contact" class="hover:text-blue-600">Contact Support</a>
              <a href="/privacy" class="hover:text-blue-600">Privacy Policy</a>
              <a href="/terms" class="hover:text-blue-600">Terms & Service</a>
              <a href="/disclaimer" class="hover:text-blue-600">Legal Disclaimer</a>
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-100 text-[10px] font-mono text-slate-400 text-center">
          © 2026 LiveTools Corp. All calculations output CC0 permissive.
        </div>
      </footer>
    </div>
  `;

  const homeOutputHtml = processTemplate(
    template,
    homeTitle,
    homeDesc,
    homeKeywords,
    'https://livetools.me/',
    homeSchemas,
    homeBodyHtml
  );

  fs.writeFileSync(TEMPLATE_PATH, homeOutputHtml, 'utf8');

  // 4. GENERATE SITEMAP.XML IN BOTH public/ and dist/ FOR DEPLOYMENT CONSISTENCY
  console.log('Generating complete sitemap.xml listing all 500+ URLs...');
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  const staticUrls = [
    'https://livetools.me/',
    'https://livetools.me/about',
    'https://livetools.me/contact',
    'https://livetools.me/privacy',
    'https://livetools.me/terms',
    'https://livetools.me/disclaimer'
  ].map((url) => {
    const isHome = url === 'https://livetools.me/';
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-06-23</lastmod>\n    <changefreq>${isHome ? 'daily' : 'monthly'}</changefreq>\n    <priority>${isHome ? '1.0' : '0.5'}</priority>\n  </url>`;
  }).join('\n');

  const toolUrls = ALL_TOOLS.map((t) => {
    return `  <url>\n    <loc>https://livetools.me/tools/${t.slug}</loc>\n    <lastmod>2026-06-23</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  }).join('\n');

  const sitemapFooter = `\n</urlset>`;
  const fullSitemap = sitemapHeader + staticUrls + '\n' + toolUrls + sitemapFooter;

  fs.writeFileSync(path.resolve(DIST_DIR, 'sitemap.xml'), fullSitemap, 'utf8');
  fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), fullSitemap, 'utf8');

  // 5. COPY ROBOTS.TXT
  console.log('Copying robots.txt to output build directory...');
  const robotsSrc = path.resolve(__dirname, '../public/robots.txt');
  const robotsDst = path.resolve(DIST_DIR, 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDst);
  }

  console.log('Pre-rendering pipeline completed successfully.');
  console.log(`Pre-rendered: ${ALL_TOOLS.length} tools, 5 legal pages, 1 homepage.`);
  console.log(`Wrote sitemap.xml and robots.txt to build output directory.`);
}

run();
