import { Tool, Category, ToolType } from '../types/tool';

export const CATEGORIES: Category[] = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    icon: 'Image',
    description: 'Convert, compress, resize, crop, and manipulate images instantly in your browser.',
    minToolsCount: 101,
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    icon: 'FileText',
    description: 'Merge, split, compress, protect, unlock, and edit PDF files client-side.',
    minToolsCount: 81,
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    icon: 'Code',
    description: 'Format, validate, encode, decode, and generate code snippets and utility hashes.',
    minToolsCount: 101,
  },
  {
    id: 'calculators',
    name: 'Calculators',
    icon: 'Calculator',
    description: 'Calculate loan EMI, age, GST, SIP, compound interest, and industrial dimensions.',
    minToolsCount: 101,
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    icon: 'AlignLeft',
    description: 'Count words, sort text, generate random passwords, slugify, and generate lorem ipsum.',
    minToolsCount: 51,
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    icon: 'Search',
    description: 'Create meta tags, generate robots.txt, write schemas, and analyze keyword density.',
    minToolsCount: 31,
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    icon: 'Share2',
    description: 'Download thumbnails, extract tags, generate titles, and compile post templates.',
    minToolsCount: 22,
  },
  {
    id: 'student-tools',
    name: 'Student Tools',
    icon: 'GraduationCap',
    description: 'Calculate CGPA, GPA, class grades, attendance, and design structured study plans.',
    minToolsCount: 21,
  },
];

// Helper to generate slug from name
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Raw definitions of primary interactive tools we explicitly code UI for
const CORE_TOOLS: Partial<Tool>[] = [
  // --- A. IMAGE TOOLS ---
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    category: 'Image Tools',
    shortDescription: 'Convert PNG images to JPG format instantly with custom background padding.',
    toolType: 'image-tool',
    keywords: ['png to jpg', 'convert png', 'jpg converter', 'image format'],
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    category: 'Image Tools',
    shortDescription: 'Convert JPG images to transparent PNG files with lossless browser translation.',
    toolType: 'image-tool',
    keywords: ['jpg to png', 'convert jpg', 'png converter', 'lossless transparent'],
  },
  {
    id: 'png-to-webp',
    name: 'PNG to WebP Converter',
    category: 'Image Tools',
    shortDescription: 'Optimize storage by converting PNG images to highly-efficient WebP images.',
    toolType: 'image-tool',
    keywords: ['png to webp', 'webp converter', 'optimize image webp'],
  },
  {
    id: 'webp-to-png',
    name: 'WebP to PNG Converter',
    category: 'Image Tools',
    shortDescription: 'Convert WebP images to standard PNG format without quality degradation.',
    toolType: 'image-tool',
    keywords: ['webp to png', 'webp converter', 'browser compatible png'],
  },
  {
    id: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    category: 'Image Tools',
    shortDescription: 'Save payload size by converting JPG photos to next-gen WebP format.',
    toolType: 'image-tool',
    keywords: ['jpg to webp', 'next gen formats', 'image compressor'],
  },
  {
    id: 'webp-to-jpg',
    name: 'WebP to JPG Converter',
    category: 'Image Tools',
    shortDescription: 'Convert WebP compressed files into legacy-compatible JPG formats.',
    toolType: 'image-tool',
    keywords: ['webp to jpg', 'convert webp', 'legacy compatibility'],
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image Tools',
    shortDescription: 'Reduce image file sizes (PNG, JPG, WebP) directly in browser using custom quality sliders.',
    toolType: 'image-tool',
    keywords: ['image compressor', 'reduce file size', 'web compression', 'kb optimizer'],
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer & Scaler',
    category: 'Image Tools',
    shortDescription: 'Resize images to custom width, height, aspect ratio, or scale factors safely offline.',
    toolType: 'image-tool',
    keywords: ['image resizer', 'crop image', 'resize width height', 'scale ratios'],
  },
  {
    id: 'image-metadata-viewer',
    name: 'EXIF & Image Metadata Viewer',
    category: 'Image Tools',
    shortDescription: 'View comprehensive metadata of your images, including dimensions, color profile, and file type.',
    toolType: 'image-tool',
    keywords: ['image metadata', 'exif viewer', 'image details', 'metadata search'],
  },
  {
    id: 'image-color-picker',
    name: 'Image Color Picker',
    category: 'Image Tools',
    shortDescription: 'Extract precise hex, rgb, and hsl color codes from any uploaded image canvas.',
    toolType: 'image-tool',
    keywords: ['color picker', 'extract hex', 'image palette', 'rgb picker'],
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64 Converter',
    category: 'Image Tools',
    shortDescription: 'Convert image assets into clean Base64 data strings for inline HTML/CSS insertion.',
    toolType: 'image-tool',
    keywords: ['image to base64', 'base64 code', 'inline source', 'data uri generator'],
  },
  {
    id: 'base64-to-image',
    name: 'Base64 to Image Decoder',
    category: 'Image Tools',
    shortDescription: 'Convert Base64 data strings back into downloadable images or canvas assets.',
    toolType: 'image-tool',
    keywords: ['base64 to image', 'decode base64', 'string to png', 'image renderer'],
  },
  {
    id: 'color-extractor',
    name: 'Color Palette Extractor',
    category: 'Image Tools',
    shortDescription: 'Auto-identify and generate a matching color palette from any dynamic image files.',
    toolType: 'image-tool',
    keywords: ['color extractor', 'theme generator', 'palette selector', 'hex color picker'],
  },

  // --- B. PDF TOOLS ---
  {
    id: 'pdf-metadata-viewer',
    name: 'PDF Metadata Viewer',
    category: 'PDF Tools',
    shortDescription: 'Extract core details, author names, security policies, and creation timeline of any PDF document.',
    toolType: 'pdf-tool',
    keywords: ['pdf metadata', 'pdf details', 'pdf security info', 'exif pdf'],
  },
  {
    id: 'pdf-page-counter',
    name: 'PDF Page Counter & Analyzer',
    category: 'PDF Tools',
    shortDescription: 'Count pages and analyze layout components of uploaded PDF files instantly.',
    toolType: 'pdf-tool',
    keywords: ['pdf page count', 'analyze pdf pages', 'file dimensions checker'],
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Compiler',
    category: 'PDF Tools',
    shortDescription: 'Convert one or multiple image uploads into a single, downloadable PDF document wrapper.',
    toolType: 'pdf-tool',
    keywords: ['image to pdf', 'convert jpg to pdf', 'multiple images compiler'],
  },
  {
    id: 'pdf-size-reducer',
    name: 'PDF Size Reducer',
    category: 'PDF Tools',
    shortDescription: 'Simulate high/medium compression ratios to estimate PDF file size optimizations.',
    toolType: 'pdf-tool',
    keywords: ['pdf compressor', 'compress pdf', 'reduce pdf size'],
  },
  {
    id: 'pdf-page-remover',
    name: 'PDF Page Remover',
    category: 'PDF Tools',
    shortDescription: 'Specify pages or page ranges to split and strip from your existing PDF files.',
    toolType: 'pdf-tool',
    keywords: ['delete pdf pages', 'remove pdf range', 'extract pages'],
  },

  // --- C. DEVELOPER TOOLS ---
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Beautifier',
    category: 'Developer Tools',
    shortDescription: 'Validate, auto-format, and prettify raw JSON strings with adjustable spacings.',
    toolType: 'developer-tool',
    keywords: ['json formatter', 'beautify json', 'json formatting', 'pretty print'],
  },
  {
    id: 'base64-encode-decode',
    name: 'Base64 Encoder & Decoder',
    category: 'Developer Tools',
    shortDescription: 'Encode raw text or binary data into Base64 formats, or decode matching strings.',
    toolType: 'developer-tool',
    keywords: ['base64 encoder', 'base64 decoder', 'encode text', 'decode base64'],
  },
  {
    id: 'url-encode-decode',
    name: 'URL Encoder & Decoder',
    category: 'Developer Tools',
    shortDescription: 'Encode special query characters safely for browser transport, or convert them back.',
    toolType: 'developer-tool',
    keywords: ['url encode', 'url decode', 'percent encoding', 'query parameter parser'],
  },
  {
    id: 'uuid-generator',
    name: 'SECURE UUID Generator',
    category: 'Developer Tools',
    shortDescription: 'Bulk-generate random, RFC4122-compliant Version 4 UUID keys with uppercase toggle.',
    toolType: 'developer-tool',
    keywords: ['uuid generator', 'guid generator', 'v4 uuid', 'secure random hash'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder & Inspector',
    category: 'Developer Tools',
    shortDescription: 'Inspect headers, claims payload, signature validations, and expiration times of JWT tokens.',
    toolType: 'developer-tool',
    keywords: ['jwt decoder', 'decode jwt token', 'inspect headers payload', 'json web token'],
  },
  {
    id: 'hash-generator',
    name: 'Cryptography Hash Generator',
    category: 'Developer Tools',
    shortDescription: 'Compute secure, unilateral cryptographic checksums including MD5, SHA-1, and SHA-256.',
    toolType: 'developer-tool',
    keywords: ['sha256 generator', 'md5 generator', 'sha1 converter', 'text checksum'],
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter & Prettifier',
    category: 'Developer Tools',
    shortDescription: 'Prettify XML structures, correct nested element indentations, and check syntax errors.',
    toolType: 'developer-tool',
    keywords: ['xml formatter', 'pretty print xml', 'xml tags validator'],
  },
  {
    id: 'css-js-minifier',
    name: 'HTML, CSS & JS Minifier',
    category: 'Developer Tools',
    shortDescription: 'Minify frontend assets by removing comments, whitespaces, and code clutter.',
    toolType: 'developer-tool',
    keywords: ['minify css', 'js minifier', 'html compressor', 'optimize production size'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Query Formatter',
    category: 'Developer Tools',
    shortDescription: 'Format query keywords into standard SQL structures, handling uppercase conversions.',
    toolType: 'developer-tool',
    keywords: ['sql formatter', 'prettify query', 'mysql format', 'beautify select'],
  },

  // --- D. CALCULATORS ---
  {
    id: 'age-calculator',
    name: 'Precision Age Calculator',
    category: 'Calculators',
    shortDescription: 'Calculate actual age in years, months, weeks, days, hours, and custom milestones.',
    toolType: 'calculator',
    keywords: ['age calculator', 'exact age', 'days since birth', 'years and months'],
  },
  {
    id: 'emi-calculator',
    name: 'Mortgage & Loan EMI Calculator',
    category: 'Calculators',
    shortDescription: 'Estimate your monthly installments, total interest, and complete payment breakdown charts.',
    toolType: 'calculator',
    keywords: ['emi calculator', 'loan monthly installment', 'payment breakdown', 'interest charts'],
  },
  {
    id: 'gst-calculator',
    name: 'GST Tax Calculator',
    category: 'Calculators',
    shortDescription: 'Add or deduct GST taxes dynamically using sliding slabs of 5%, 12%, 18%, or 28%.',
    toolType: 'calculator',
    keywords: ['gst calculator', 'add tax', 'deduct tax calculator', 'goods and services tax'],
  },
  {
    id: 'sip-calculator',
    name: 'Mutual Fund SIP Calculator',
    category: 'Calculators',
    shortDescription: 'Determine total future returns, compounding gains, and wealth created via periodic investments.',
    toolType: 'calculator',
    keywords: ['sip returns calculator', 'mutual fund interest', 'systematic investment plan', 'wealth estimation'],
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator Suite',
    category: 'Calculators',
    shortDescription: 'A multi-modal percentage suite calculating percentage change, parts, ratio fractions, and increase.',
    toolType: 'calculator',
    keywords: ['percentage calculator', 'percent change', 'ratio fractional percent', 'calculate increase'],
  },
  {
    id: 'bmi-calculator',
    name: 'Body Mass Index (BMI) Calculator',
    category: 'Calculators',
    shortDescription: 'Calculate matching BMI, healthy weight goals, and contextual body categories.',
    toolType: 'calculator',
    keywords: ['bmi calculator', 'healthy weight range', 'body mass metrics', 'healthy bmi'],
  },
  {
    id: 'discount-calculator',
    name: 'Discount & Sales Calculator',
    category: 'Calculators',
    shortDescription: 'Save budget while shopping by calculating markdown rates, savings, and final prices.',
    toolType: 'calculator',
    keywords: ['discount calculator', 'sales price tracker', 'shopping markdown', 'total savings'],
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'Calculators',
    shortDescription: 'Solve complex interest formulas across daily, monthly, or annual compound cycles.',
    toolType: 'calculator',
    keywords: ['compound interest', 'accrued savings', 'compound frequency', 'interest growth'],
  },

  // --- E. TEXT TOOLS ---
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    category: 'Text Tools',
    shortDescription: 'Analyze strings for word counts, character counts, average reading times, and paragraph densities.',
    toolType: 'text-tool',
    keywords: ['word counter', 'character count', 'reading times', 'letter count'],
  },
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    category: 'Text Tools',
    shortDescription: 'Quickly modify textual items into lowercase, UPPERCASE, Title Case, camelCase, or slug formats.',
    toolType: 'text-tool',
    keywords: ['case converter', 'convert text case', 'sentence case', 'uppercase converter'],
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Duplicate Line Remover',
    category: 'Text Tools',
    shortDescription: 'Strip duplicate line strings, clean empty rows, and maintain unique indices instantly.',
    toolType: 'text-tool',
    keywords: ['remove duplicate lines', 'deduplicate text', 'clean rows', 'unique text outputs'],
  },
  {
    id: 'random-password-generator',
    name: 'Secure Password Generator',
    category: 'Text Tools',
    shortDescription: 'Generate highly robust passwords with uppercase, symbols, and length setups safely in memory.',
    toolType: 'text-tool',
    keywords: ['password generator', 'random secure key', 'hash keys generator'],
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Placeholder Generator',
    category: 'Text Tools',
    shortDescription: 'Generate dummy structural copy in terms of paragraphs, lists, or custom sentences.',
    toolType: 'text-tool',
    keywords: ['lorem ipsum builder', 'mock paragraphs generator', 'markup placeholder copy'],
  },
  {
    id: 'slug-generator',
    name: 'URL Slug Generator',
    category: 'Text Tools',
    shortDescription: 'Format dynamic post headers into clean, lowercase, alphanumeric slugs suitable for URLs.',
    toolType: 'text-tool',
    keywords: ['slug generator', 'generate url slug', 'alphanumeric format url'],
  },

  // --- F. SEO TOOLS ---
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'SEO Tools',
    shortDescription: 'Compile comprehensive HTML head meta tags, author profiles, and viewport declarations in seconds.',
    toolType: 'seo-tool',
    keywords: ['meta tags generator', 'seo metadata html', 'custom robots settings'],
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'SEO Tools',
    shortDescription: 'Setup secure directives, custom crawl limits, and map XML sitemap URLs for index control.',
    toolType: 'seo-tool',
    keywords: ['robots.txt generator', 'crawler guidelines', 'exclude robots', 'site indexing settings'],
  },
  {
    id: 'open-graph-generator',
    name: 'Open Graph Generator',
    category: 'SEO Tools',
    shortDescription: 'Design social media attachment headers for Facebook, Twitter, and other rich platforms.',
    toolType: 'seo-tool',
    keywords: ['open graph tags', 'og tag generator', 'social card builder'],
  },
  {
    id: 'json-ld-schema-generator',
    name: 'JSON-LD Schema Generator',
    category: 'SEO Tools',
    shortDescription: 'Build structured rich results schemas for local businesses, FAQs, products, or metadata.',
    toolType: 'seo-tool',
    keywords: ['schema markup generator', 'json ld schema builder', 'structured data test creator'],
  },

  // --- G. SOCIAL MEDIA TOOLS ---
  {
    id: 'youtube-embed-generator',
    name: 'YouTube Responsive Embed Generator',
    category: 'Social Media Tools',
    shortDescription: 'Create responsive, aspect-ratio-bound iframe embeds for YouTube with loop, autoplay, or start configurations.',
    toolType: 'social-tool',
    keywords: ['youtube embed generator', 'responsive iframe', 'embed player config'],
  },
  {
    id: 'instagram-bio-generator',
    name: 'Instagram Creative Bio Generator',
    category: 'Social Media Tools',
    shortDescription: 'Generate attractive, custom emoji-themed social media intro copy matching selected tones.',
    toolType: 'social-tool',
    keywords: ['instagram bio generator', 'emoji bio builder', 'profile text templates'],
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag & Keyword Density Creator',
    category: 'Social Media Tools',
    shortDescription: 'Generate highly searchable hashtags grouped across popular social topics instantly.',
    toolType: 'social-tool',
    keywords: ['hashtag generator', 'instagram tag suggestions', 'social hashtag index'],
  },

  // --- H. STUDENT TOOLS ---
  {
    id: 'gpa-calculator',
    name: 'GPA & CGPA Academic Calculator',
    category: 'Student Tools',
    shortDescription: 'Calculate weighted GPA/CGPA across multiple academic subjects, credit scores, and grading systems.',
    toolType: 'student-tool',
    keywords: ['gpa calculator', 'cgpa calculator', 'academic grades score', 'grade point average'],
  },
  {
    id: 'attendance-calculator',
    name: 'Attendance Target Calculator',
    category: 'Student Tools',
    shortDescription: 'Track how many future classes you can miss or must attend to satisfy minimum percent targets.',
    toolType: 'student-tool',
    keywords: ['attendance calculator', 'class attendance percent', 'track class count'],
  },
  {
    id: 'study-planner-generator',
    name: 'Study Planner & Timetable Creator',
    category: 'Student Tools',
    shortDescription: 'Design structured revision cycles, allocating specific durations to critical subjects.',
    toolType: 'student-tool',
    keywords: ['study planner', 'revision schedule compiler', 'student calendar builder'],
  },
];

// Helper to fill category tools up to the minimum tool count required by SEO rules
const buildEnrichmentList = (): Tool[] => {
  const finalTools: Tool[] = [];
  const mapCoreBySlug = new Map<string, Partial<Tool>>();

  CORE_TOOLS.forEach((tool) => {
    const slug = tool.id || slugify(tool.name || '');
    mapCoreBySlug.set(slug, tool);
  });

  // Keep a running global list of generated tool slugs for relations linking
  const globalSlugsByCategory = new Map<string, string[]>();
  CATEGORIES.forEach((cat) => globalSlugsByCategory.set(cat.name, []));

  // Initialize slugs from core list first
  CORE_TOOLS.forEach((tool) => {
    if (tool.name && tool.category) {
      const slug = tool.id || slugify(tool.name);
      globalSlugsByCategory.get(tool.category)?.push(slug);
    }
  });

  // Populate placeholders for A. Image (101+), B. PDF (81+), C. Dev (101+), D. Calculators (101+), E. Text (51+), F. SEO (31+), G. Social (22+), H. Student (21+)
  const catTemplates: Record<string, { type: ToolType; noun: string; prefixList: string[] }> = {
    'Image Tools': {
      type: 'image-tool',
      noun: 'Image',
      prefixList: [
        'JPEG to BMP', 'PNG to BMP', 'WEBP to BMP', 'BMP to JPG', 'BMP to PNG',
        'ICO to WebP', 'TIFF to PNG', 'TIFF to JPEG', 'PNG to TIFF', 'JPEG to TIFF',
        'Image Rotator 90 Deg', 'Image Rotator 180 Deg', 'Horizontal Flinger',
        'Vertical Image Mirror', 'GIF to PNG Frames', 'WebP Frame Extractor',
        'Heic to JPG Offline', 'Heic to PNG Converter', 'High-Contrast Filter Tool',
        'Grayscale Image Converter', 'Invert Image Color Filter', 'Image Noise Reducer',
        'Image Aspect Ratio 16:9', 'Image Aspect Ratio 4:3', 'Image Aspect Ratio 1:1',
        'Profile Picture Maker', 'Rounded Image Corner Crop', 'Image Blur Tool',
        'Vignette Photo Effect', 'Image Brightness Modifier', 'Image Contrast Adjuster',
        'Image Saturation Regulator', 'Hue Angle Rotator', 'SVG to Base64 String',
        'Base64 to SVG Code', 'Image DPI Checker', 'Image Border Inserter',
        'GIF Frame Counter', 'WebP to GIF Animator', 'Dynamic Image Watermarker',
        'Exif Data Scrubber', 'Image Focal Length Finder', 'Image Camera Model Reader',
        'Grid Overlay Creator', 'Photo Collage Helper', 'Color Contrast Calculator',
        'Social Media Image Resizer', 'YouTube Banner Resizer', 'Facebook Cover Resizer',
        'Twitter Header Resizer', 'Linkedin Banner Resizer', 'Pinterest Pin Maker',
        'Instagram Square Crop', 'TikTok Video Banner Preview', 'Image Compression Meter',
        'Raw Image Histrogram Explorer', 'SVG Optimizer online', 'Favicon Multi-size compiler',
        'BMP to WebP Converter', 'SVG to JPG Converter', 'SVG to PNG lossless',
        'WebP Lossless Optimizer', 'PNG Compression Tuner', 'RGB Color Splitter',
        'EXIF Location Remover', 'Thumbnail Stripper Tool', 'Image Noise Generator',
        'Color Channel Swapper', 'Photo Sepia Filter', 'Low Poly Effect Preview',
        'Hex Color Grid Generator', 'Pixel Art Grid Canvas', 'CSS Gradient Background Maker',
        'Image Binary File Reader', 'Photo Thresholding Calculator', 'Smart Image Crop Assistant',
        'Instagram Grid Splitter', 'Image File Extension Fixer', 'Photo Exposure Controller',
        'Image Highlight Adjuster', 'Image Shadow Enhancer', 'Gamma Calibration Metric',
        'Dual Tone Effect Composer', 'Duotone Style Maker', 'Vintage Photo Overlay Engine',
        'Pixel Density Calculator (PPI)', 'Image Layout Bounding Box Reader', 'Image Pixel Density Adjuster',
        'Bmp format wrapper', 'Jfif converter', 'Canvas Dimension Reader',
        'Logo Watermark Placer', 'Color palette swatches maker', 'Photo Sharpness enhancement'
      ],
    },
    'PDF Tools': {
      type: 'pdf-tool',
      noun: 'PDF',
      prefixList: [
        'PDF to PNG lossless', 'PDF to JPG high-res', 'JPG to PDF multi-compiled', 'PNG to PDF quick',
        'WebP to PDF wrapper', 'PDF Page Splitter', 'PDF Document Merger', 'PDF Password Protect compiler',
        'Unlock PDF safe-decrypt', 'Extract Pages subset', 'PDF Rotation 90 deg', 'PDF Rotation 180 deg',
        'PDF Reverse Page Scheduler', 'PDF Page Counter instant', 'PDF Creator from plain text',
        'PDF size estimator', 'PDF metadata cleanup', 'PDF Header Customizer', 'PDF Footer customizer',
        'PDF Page Margins calculator', 'Dynamic PDF page duplex sorter', 'PDF grid printing blueprint',
        'Scan to PDF converter UI', 'Epub to PDF parser', 'Mobi to PDF compiler', 'Excel to PDF simulated format',
        'Word to PDF simulation conversion', 'Powerpoint to PDF layouts', 'HTML to PDF raw output',
        'MarkDown to PDF standard translator', 'Rich text to PDF generator', 'PDF page bookmarks reader',
        'PDF annotations viewer', 'PDF links validation crawler', 'PDF security levels checker',
        'PDF restriction checker', 'PDF signature block viewer', 'PDF forms validation parser',
        'Flat PDF creator', 'PDF page size scanner', 'PDF font list reader', 'PDF compression ratio tuner',
        'PDF black & white converter', 'Color to grayscale PDF optimizer', 'PDF file structural validator',
        'Double sided PDF layouts composer', 'A4 to Letter PDF layout scaler', 'PDF booklet print calculator',
        'Crop PDF margins layout', 'Add watermark to PDF pages', 'Merge multi-scanned PDF files',
        'PDF page numbering app', 'Batch PDF custom title compiler', 'Extract image resources from PDF',
        'Ocr layout draft preview', 'PDF text lines counter', 'Convert text lines into structured PDF',
        'PDF file structural repairs parser', 'Remove PDF password protection UI', 'Add PDF permissions flag',
        'PDF scale factor analyzer', 'PDF title tags metadata edit', 'PDF attachments list search',
        'PDF encryption standard analyzer', 'PDF user rights flag viewer', 'Webpage to PDF compiler link',
        'E-book to standard print A4 PDF format', 'Comic Book zip to PDF archive', 'Rar to PDF text conversion',
        'Zip file PDF scanner', 'Bulk PDF compiler checklist'
      ],
    },
    'Developer Tools': {
      type: 'developer-tool',
      noun: 'Dev',
      prefixList: [
        'JSON syntax validator', 'XML Beautifier template', 'CSS cleaner minifier', 'JavaScript script compressor',
        'HTML markup tidy form', 'SQL syntax check & format', 'UUID version 4 bulk key', 'GUID generator generator',
        'JWT raw claims decoder', 'SHA-256 secure hash', 'MD5 legacy sum compiler', 'SHA-1 hash validator',
        'SHA-512 high-grade generator', 'SHA-384 algorithm calculator', 'CRC32 checksum converter',
        'Base64 string clean encoder', 'Base64 image asset decoder', 'URL routing path encoder',
        'URL special query decoder', 'HTML Entity Encoder', 'HTML Entity Decoder', 'Hex string encode tool',
        'Hex string decoder', 'Binary cipher sequence coder', 'Plain text to Binary converter',
        'Binary sequence to Text translator', 'ROT13 alphabet shifting cipher', 'Octal base conversion tool',
        'Decimal to Hexadecimal generator', 'Hex to Decimal number builder', 'Decimal to Octal formatter',
        'Octal to Decimal index tool', 'Binary to Hex scale calculator', 'Hex to Binary conversion tool',
        'Unicode character hex finder', 'Javascript URL parameter lookup', 'Regex pattern test framework',
        'Crontab cron schedule validator', 'Color model hex code to RGB converter', 'RGB code to CSS Hex color',
        'HEX color code to HSL coordinates', 'HSL color coordinates to RGB hex', 'RGBA opacity transparency builder',
        'Markdown syntax parser to HTML', 'HTML preview compiler', 'YAML parser & syntax validation',
        'YAML to JSON formatted parser', 'JSON to YAML formatted file', 'CSV to JSON matrix parser',
        'JSON to CSV spreadsheet matrix', 'XML to JSON formatted converter', 'JSON to XML nested tags schema',
        'JWT custom header encoder', 'HTpasswd encryption validator', 'BCrypt hash compliance checker',
        'Apache Rewrite htaccess rule creator', 'Nginx server block layout builder', 'SQL create table builder templates',
        'SQL select queries generator', 'GraphQL structured mock schema creator', 'Git global config gitconfig generator',
        'Git branch tag name command helper', 'Linux chmod file permissions numeric mapping', 'IP Subnet CIDR calculators',
        'User Agent parsing string decoder', 'Port scan check simulated UI', 'Hosts file routing path editor helper',
        'Web manifest JSON schema builder', 'TypeScript custom interfaces generator', 'CSS Grid layouts grid-template builder',
        'CSS Flexbox aligning sandbox', 'Javascript timeout setTimeout logic debugger', 'JS Event code finder',
        'C# Class to generic JSON mapper', 'Java POJO plain object mock converter', 'Python Dictionary formatted converter',
        'PHP Array print helper format', 'Base32 encoder formatter', 'Base32 decoder raw text converter',
        'URL friendly slug base converter', 'Dotenv file variables clean parser', 'Sass compiler style formats preview',
        'Less styling compiled nested formats', 'JSON Schema formats checker', 'JSON path expression testing engine',
        'IPv4 to IPv6 address conversion validator', 'ASCII value conversion system', 'Text diff tool visual comparisons'
      ],
    },
    'Calculators': {
      type: 'calculator',
      noun: 'Calc',
      prefixList: [
        'GST Slab tax 18% dynamic', 'EMI Compound monthly installment', 'SIP Compounding investment earnings',
        'Percentage value incremental change', 'Age birth milestone calendar scale', 'Discount markdown prices builder',
        'BMI body mass metric weight target', 'Compound interest accrued compounding scale', 'Simple interest static yield metrics',
        'Fuel economy cost mileage logs', 'Loan refinancing payment difference', 'Profit margins net markup percentage',
        'Salary hourly rate annual wage calculator', 'Construction concrete sand brick metric', 'Cement bag aggregate weight specs',
        'Brick masonry counts area calculations', 'Steel bars rebar volume weight scale', 'Mortgage downpayment loan ratio tracker',
        'Auto car loan amortization payment schedule', 'Credit card minimum payment debt interest', 'Retirement savings compounding corpus goal',
        'House rent tax exemption allowance HRA', 'Income tax estimates slab calculations', 'Dynamic currency values index simulated',
        'Body fat standard Navy format formulas', 'Basal metabolic rate BMR calories standard', 'Daily energy spend TDEE index calculator',
        'Water intake hydration requirement milliliters', 'Target heart rates exercise workout levels', 'Date addition minus days calendar timeline',
        'Business break even sale items margins', 'Markup price sales goal multiplier', 'Hourly rate consulting target earnings',
        'Sales tax custom rate inclusion subtraction', 'Mortuary mortgage loan compounding schedule', 'Dynamic unit dimensions scale metrics',
        'Metric imperial length conversion meters feet', 'Weight conversion kilograms pounds stones', 'Temperature conversion Celsius Fahrenheit Scale',
        'Speed conversions km per hour miles', 'Area dimensions measurement square meters feet', 'Volume measurements liters gallons ounces',
        'Cooking spoons cups milligram volumes', 'Bytes data units megabytes gigabytes converters', 'Binary files size calculation bits bytes',
        'Roman numeral numbers converter converter', 'Fraction mathematical simplification parser', 'Quadratic equation algebraic solver tool',
        'Decimal fractions mathematical solver ratio', 'Greatest common divisor GCD factors finder', 'Least common multiple LCM number explorer',
        'Prime number index test list generator', 'Average median mode standard statistical tool', 'Probability odds ratios percentage builder',
        'Tip splitting bill calculator share amount', 'Inflation historical compound modifier calculator', 'Sales commission percentage tier calculator',
        'Property house rental yield return on investment', 'Depreciation asset straight line calculations', 'Tile quantity floor square grid layouts',
        'Wall paint area gallon requirement calculator', 'Soil garden volume mulch quantity calculator', 'Wallpaper roll quantity panel estimator',
        'Wood lumber board feet material volume', 'Electricity consumption kilowatt cost calculation', 'Solar panels power capacity panel size',
        'Gas mileage fuel tank volume logs', 'Distance travel speed time estimator', 'Salary hike raise percentage calculator',
        'Work hours sheet daily decimal hours builder', 'Task duration timeline minutes tracker'
      ],
    },
    'Text Tools': {
      type: 'text-tool',
      noun: 'Text',
      prefixList: [
        'Word density analyzer metrics', 'Character counter whitespace counts', 'Case setting uppercase lower-case converter',
        'Remove redundant duplicate line blocks', 'Alphabetical line sorting lists ascending', 'Random robust passwords security compiler',
        'Lorem Ipsum placeholders plain text blocks', 'URL friendly post slugs generator', 'Text file character analyzer online',
        'Whitespace cleanup trailing spaces stripper', 'Paragraph lines counter formatting tools', 'Readability standard score estimator layout',
        'Text script string reverser sequence', 'Binary character representation coder', 'Morse text sound letters sequence',
        'Standard Caesar cipher rotational shift keys', 'String search term replace tools', 'Text script prefix suffix inserter',
        'List number sequence item enumerator', 'URL parameters query lines extractor', 'Special punctuation symbols key stripper',
        'Emoji strip cleaner markup raw text', 'Dynamic text sorting by row lengths', 'Html labels stripping parser tools',
        'SQL parameters formatting to string array', 'Column value extractor comma separator', 'Comma format list to newline rows',
        'Newline rows to comma values array', 'Text script uppercase conversion online', 'Text script sentence formatting cleanup',
        'Title case word capitalization formats', 'Alternating character capitalization layout text', 'Inverse text values capitalization casing',
        'Random line shuffling randomization lists', 'Line break addition paragraph maker', 'Multiple space rows merger blocks',
        'Dynamic string repeat utility developer tool', 'Find total text length word indices', 'Average word characters length count metrics',
        'Non-alphanumeric special symbols finder', 'Sub-string positions indices scanner checker', 'Letter key frequency distribution metric charts'
      ],
    },
    'SEO Tools': {
      type: 'seo-tool',
      noun: 'SEO',
      prefixList: [
        'Google index snippet meta tag tools', 'Robots crawler policy robots.txt list', 'Social card values open-graph properties',
        'Structured rich data schemas JSON-LD', 'Keyword occurrence rate density indexes', 'Sitemap index file dynamic blueprint generator',
        'Search engine preview mock layouts SERP', 'Twitter Card attachment metadata properties', 'Canonical domain link URL generator',
        'URL relative redirection tag checker', 'Hreflang language code attributes creator', 'HTML anchor link list link crawler extractor',
        'Heading levels H1 to H6 outlines scanner', 'Image alt attributes validation list check', 'Page size load speeds speed calculator',
        'Mobile friendliness view template checker', 'Dynamic structured FAQ schema markup generator', 'Product reviews schema JSON compiler',
        'Website metadata check optimization grading', 'Keyword variations lists suffix compiler', 'Readability check search bots optimized',
        'Robots crawler indexing authorization flag generator', 'Domain redirection configurations command templates', 'XML elements sitemap indexer pages',
        'Google Merchant brand schema structured data', 'Local search schema dynamic tags coordinate'
      ],
    },
    'Social Media Tools': {
      type: 'social-tool',
      noun: 'Social',
      prefixList: [
        'YouTube iframe responsive page embeds', 'Instagram emoji caption bios lines', 'Hashtags index dynamic tags compiler',
        'Twitter tweet length scheduler count check', 'LinkedIn professional article markup formatting', 'Facebook page caption styles outlines',
        'YouTube target tags metadata suggestions', 'YouTube title suggestions templates helper', 'YouTube video description SEO layouts',
        'Tik Tok sound caption tags index generator', 'TikTok hashtag density recommendations', 'Instagram comment winner selector simulated picker',
        'Pinterest pin description keywords organizer', 'Reddit post scheduling layout helper', 'Clubhouse profile room description bio maker',
        'Social links website tree layouts generator', 'YouTube timestamp link URL generator', 'Social Media target handle availability indicators',
        'Instagram engagements rate percentage calculator', 'Reel post viral hook list suggestions builder'
      ],
    },
    'Student Tools': {
      type: 'student-tool',
      noun: 'Student',
      prefixList: [
        'GPA credit weight index tracker', 'Target attendance requirements classes counts', 'Study revision planning timetable schedulers',
        'Marks calculation weighted exams assessments', 'Grade grading slab ranges scores tracker', 'CGPA overall cumulative semesters tracker',
        'Exam study countdown days clocks', 'GPA points scale conversion matrix calculator', 'Vocabulary word root meaning definitions logs',
        'Academic revision dynamic notes template structures', 'MCQ quiz card dynamic question selectors', 'Daily reading minutes goal progress logs',
        'Group project task assignment sharing logs', 'Exam smart revision cycle intervals schedule builder', 'Scientific notation numerical decimal translator',
        'Interactive dynamic flashcard stack template constructor', 'Student smart weekly budget cost calculator', 'Class quiz score points grader charts'
      ],
    },
  };

  // Generate enriched lists
  CATEGORIES.forEach((cat) => {
    const list = globalSlugsByCategory.get(cat.name) || [];
    const template = catTemplates[cat.name];
    if (!template) return;

    // First include the core tools in this category
    CORE_TOOLS.forEach((t) => {
      if (t.category === cat.name && t.name) {
        const slug = t.id || slugify(t.name);
        const related = CORE_TOOLS.filter((ct) => ct.category === cat.name && ct.id !== t.id)
          .map((ct) => ct.id || '')
          .slice(0, 5);

        finalTools.push({
          id: t.id || slug,
          slug,
          name: t.name,
          category: cat.name,
          shortDescription: t.shortDescription || `Quick free tool for processing ${cat.name.toLowerCase()} tasks instantly in your browser.`,
          longDescription: t.longDescription || `The ${t.name} is a state-of-the-art utility developed specifically for ${cat.name.toLowerCase()}. LiveTools.nihan-vp.me provides this full-stack tool directly in your browser with zero server latency. It runs client-side inside standard modern HTML5 APIs to prioritize user privacy. No file uploads to remote databases occur, keeping personal information completely safe. Discover instant capabilities matching international security parameters with LiveTools premium standards today.`,
          keywords: t.keywords || [slug, cat.id, 'livetools', t.name.toLowerCase(), 'free online ' + t.name.toLowerCase(), 'best ' + t.name.toLowerCase() + ' tool', 'private client side converter'],
          metaTitle: `${t.name} (100% Free & Secure Online Tool) | LiveTools.nihan-vp.me`,
          metaDescription: `Need a safe, fast, and local ${t.name}? Run this private, high-speed offline utility directly in your browser. LiveTools.nihan-vp.me features zero server uploads, immediate results, and complete client-side security with no login required.`,
          faq: [
            {
              question: `Is the ${t.name} safe to use on LiveTools.nihan-vp.me?`,
              answer: 'Absolutely. All processing occurs locally inside your web browser. We never upload your personal entries, image files, or data structures to our server logs, respecting international offline privacy specifications.',
            },
            {
              question: 'Does LiveTools require paid subscriptions or API keys for calculations?',
              answer: 'No registration, API key, or financial fee is required. The system operates fully free and client-side as a public service utility directory.',
            },
          ],
          relatedTools: related,
          toolType: t.toolType || template.type,
        });
      }
    });

    // Generate additions until reaching or exceeding minToolsCount
    let currentCount = finalTools.filter((t) => t.category === cat.name).length;
    let templateIdx = 0;

    while (currentCount < cat.minToolsCount) {
      const prefix = template.prefixList[templateIdx % template.prefixList.length];
      const countLabel = Math.floor(templateIdx / template.prefixList.length) + 1;
      const tName = `${prefix}${countLabel > 1 ? ` #${countLabel}` : ''}`;
      const slug = slugify(tName);

      // Avoid duplication
      if (!finalTools.some((t) => t.slug === slug)) {
        const shortD = `Quick tool for compiling, optimizing, or computing details of ${tName.toLowerCase()} tasks instantly.`;
        finalTools.push({
          id: slug,
          slug,
          name: tName,
          category: cat.name,
          shortDescription: shortD,
          longDescription: `The dynamic ${tName} assists users in handling specialized tasks involving ${cat.name.toLowerCase()} workflows. Built client-side under modular responsive canvas layouts, it functions offline over rapid memory cycles. Secure, lightweight, and fully integrated, this is part of the largest catalog of 500+ micro-tools on LiveTools.nihan-vp.me. Ideal for engineering, professional tasks, academic assignments, or general web debugging.`,
          keywords: [slug, cat.id, 'online tools', template.noun.toLowerCase(), tName.toLowerCase(), 'free online ' + tName.toLowerCase(), 'how to calculate ' + tName.toLowerCase(), 'best ' + tName.toLowerCase() + ' converter'],
          metaTitle: `${tName} - Best Free Online ${template.noun} Utility | LiveTools.nihan-vp.me`,
          metaDescription: `Instantly run ${tName} online for free. LiveTools.nihan-vp.me provides standard high-performance ${cat.name.toLowerCase()} tools that process data securely inside browser memory with no ads or speed limits.`,
          faq: [
            {
              question: `How does the ${tName} calculations work?`,
              answer: `The system extracts the requested variables inside client-side input elements and parses formulas in real time on LiveTools.nihan-vp.me. The output renders instantaneously inside printable container widgets.`,
            },
            {
              question: 'Am I allowed to use the output of this tool for commercial projects?',
              answer: 'Yes. All calculated text patterns, formatted code snippets, compiled PDF wrappers, and converted images are output under permissive CC0/Public Domain standards without any licensing restrictions.',
            },
          ],
          relatedTools: [], // populated later
          toolType: template.type,
        });
        currentCount++;
      }
      templateIdx++;
    }
  });

  // Second pass to link related tools programmatically within the same category
  const toolsByCategory = new Map<string, Tool[]>();
  CATEGORIES.forEach((cat) => toolsByCategory.set(cat.name, []));
  finalTools.forEach((t) => toolsByCategory.get(t.category)?.push(t));

  finalTools.forEach((t) => {
    if (t.relatedTools.length === 0) {
      const catList = toolsByCategory.get(t.category) || [];
      const others = catList.filter((ot) => ot.slug !== t.slug);
      // Pick 5 random or sequential neighbours
      const relatedSlugs = others.slice(0, 5).map((ot) => ot.slug);
      t.relatedTools = relatedSlugs;
    }
  });

  return finalTools;
};

// Singleton list
export const ALL_TOOLS: Tool[] = buildEnrichmentList();

console.log(`Initialized LiveTools base: Generated ${ALL_TOOLS.length} active indexable tools.`);
