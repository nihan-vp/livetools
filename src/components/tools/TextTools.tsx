import React, { useState, useEffect } from 'react';
import { AlignLeft, Copy, Check, Terminal, Play, RefreshCw } from 'lucide-react';

interface TextToolProps {
  slug: string;
}

export function TextTools({ slug }: TextToolProps) {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Counter stats
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    lines: 0,
    readingTime: 0,
  });

  // Password Generator states
  const [passLength, setPassLength] = useState<number>(16);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);

  // Lorem Ipsum parameters
  const [loremType, setLoremType] = useState<'paragraphs' | 'sentences'>('paragraphs');
  const [loremCount, setLoremCount] = useState<number>(3);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Stat computations for word-counter
  useEffect(() => {
    if (slug === 'word-counter') {
      const charCount = inputText.length;
      const cleanText = inputText.trim();
      const wordCount = cleanText === '' ? 0 : cleanText.split(/\s+/).length;
      const lineCount = inputText === '' ? 0 : inputText.split('\n').length;
      const timeEstimate = Math.ceil(wordCount / 200); // 200 wpm standard

      setStats({
        characters: charCount,
        words: wordCount,
        lines: lineCount,
        readingTime: timeEstimate,
      });
    }
  }, [inputText, slug]);

  // Math conversions
  const handleCaseChange = (target: 'upper' | 'lower' | 'title' | 'camel' | 'sentence') => {
    if (!inputText) return;
    let converted = '';
    if (target === 'upper') {
      converted = inputText.toUpperCase();
    } else if (target === 'lower') {
      converted = inputText.toLowerCase();
    } else if (target === 'title') {
      converted = inputText.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    } else if (target === 'sentence') {
      converted = inputText.toLowerCase().replace(/(^\s*|\.\s+)([a-z])/g, (m, separator, letter) => separator + letter.toUpperCase());
    } else if (target === 'camel') {
      converted = inputText
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, '');
    }
    setOutputText(converted);
  };

  const removeDuplicateLines = () => {
    if (!inputText) return;
    const lines = inputText.split('\n');
    const unique = Array.from(new Set(lines));
    setOutputText(unique.join('\n'));
  };

  const sortLines = () => {
    if (!inputText) return;
    const lines = inputText.split('\n');
    lines.sort((a, b) => a.localeCompare(b));
    setOutputText(lines.join('\n'));
  };

  const generateSecurePassword = () => {
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let pool = lowers + uppers;
    if (includeNumbers) pool += numbers;
    if (includeSymbols) pool += symbols;

    let res = '';
    for (let i = 0; i < passLength; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      res += pool[idx];
    }
    setOutputText(res);
  };

  const generateLoremIpsum = () => {
    const sentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Aenean diam massa, lacinia vitae hendrerit elementum, facilisis vel ligula.',
      'Sodales integer diam vitae aliquet arcu senectus class feugiat habitant donec nisl.',
      'Curabitur iaculis diam ac nisl hendrerit rhoncus.',
      'Mauris tincidunt ante ac arcu gravida porta.',
      'Donec finibus imperdiet neque cursus convallis.',
      'Vestibulum aliquet nisl et tristique bibendum.',
      'In gravida massa sodales, condimentum neque iaculis, tempor orci.',
    ];

    let resultList: string[] = [];
    if (loremType === 'sentences') {
      for (let i = 0; i < loremCount; i++) {
        resultList.push(sentences[i % sentences.length]);
      }
      setOutputText(resultList.join(' '));
    } else {
      for (let p = 0; p < loremCount; p++) {
        let pText = [];
        for (let s = 0; s < 4; s++) {
          pText.push(sentences[(p * 4 + s) % sentences.length]);
        }
        resultList.push(pText.join(' '));
      }
      setOutputText(resultList.join('\n\n'));
    }
  };

  const generateURLSlug = () => {
    if (!inputText) return;
    const slug = inputText
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '') // remove special symbols
      .replace(/\s+/g, '-') // collapse spaces
      .trim();
    setOutputText(slug);
  };

  const renderSelectedTool = () => {
    // 1. WORD COUNTER / CHAR COUNTER
    if (slug === 'word-counter') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Characters</div>
              <div className="text-xl font-bold font-mono text-slate-800 mt-1">{stats.characters}</div>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Words</div>
              <div className="text-xl font-bold font-mono text-slate-800 mt-1">{stats.words}</div>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Lines Count</div>
              <div className="text-xl font-bold font-mono text-slate-800 mt-1">{stats.lines}</div>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Estimated Reading Time</div>
              <div className="text-xl font-bold font-mono text-slate-800 mt-1">{stats.readingTime} min</div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm font-semibold text-slate-600">Paste your content here to inspect statistics:</span>
            <textarea
              id="word_counter_textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Start drafting or copy paragraphs here..."
              className="w-full h-72 p-4 font-mono text-xs bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      );
    }

    // 2. CASE CONVERTER
    if (slug === 'case-converter') {
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              id="case_upper_btn"
              onClick={() => handleCaseChange('upper')}
              className="px-4 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg"
            >
              UPPERCASE
            </button>
            <button
              id="case_lower_btn"
              onClick={() => handleCaseChange('lower')}
              className="px-4 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg"
            >
              lowercase
            </button>
            <button
              id="case_title_btn"
              onClick={() => handleCaseChange('title')}
              className="px-4 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg"
            >
              Title Case
            </button>
            <button
              id="case_sentence_btn"
              onClick={() => handleCaseChange('sentence')}
              className="px-4 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg"
            >
              Sentence Case
            </button>
            <button
              id="case_camel_btn"
              onClick={() => handleCaseChange('camel')}
              className="px-4 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg"
            >
              camelCase
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              id="case_input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text strings to change capitalization casing..."
              className="w-full h-64 p-3 bg-white border border-slate-300 rounded-xl text-xs font-mono"
            />
            <div className="relative">
              <textarea
                id="case_output"
                readOnly
                value={outputText}
                className="w-full h-64 p-3 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl text-xs font-mono"
                placeholder="Conversion results show up here..."
              />
              {outputText && (
                <button
                  id="copy_case_result"
                  onClick={() => handleCopy(outputText)}
                  className="absolute bottom-3 right-3 px-3 py-1 bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 3. REMOVE DUPLICATES OR SORT LINES
    const isLineProcessor = ['remove-duplicate-lines', 'text-sorter'].includes(slug);
    if (isLineProcessor) {
      return (
        <div className="space-y-4">
          <div className="flex gap-2 text-sm justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-xs font-semibold text-slate-600">Select Row Processor</span>
            <div className="flex gap-2">
              <button
                id="remove_lines_btn"
                onClick={removeDuplicateLines}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Deduplicate Rows
              </button>
              <button
                id="sort_lines_btn"
                onClick={sortLines}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg"
              >
                Sort Line ascending
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              id="lines_input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Item AA\nItem BB\nItem AA..."
              className="w-full h-64 p-3 bg-white border border-slate-300 rounded-xl text-xs font-mono"
            />
            <div className="relative">
              <textarea
                id="lines_output"
                readOnly
                value={outputText}
                className="w-full h-64 p-3 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl text-xs font-mono"
                placeholder="Cleaned row outputs..."
              />
              {outputText && (
                <button
                  id="copy_lines_btn"
                  onClick={() => handleCopy(outputText)}
                  className="absolute bottom-3 right-3 px-3 py-1 bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 4. RANDOM PASSWORD GENERATOR
    if (slug === 'random-password-generator') {
      return (
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Random Password Criteria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="space-y-1">
                <span className="block text-xs text-slate-500 font-semibold">Charkey Length ({passLength})</span>
                <input
                  id="pass_length_slider"
                  type="range"
                  min="8"
                  max="32"
                  value={passLength}
                  onChange={(e) => setPassLength(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  id="pass_numbers_checkbox"
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-600">Include Numbers</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  id="pass_symbols_checkbox"
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-600">Special Symbols</span>
              </div>
            </div>

            <button
              id="generate_pass_btn"
              onClick={generateSecurePassword}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
            >
              Compute Secure Key
            </button>
          </div>

          {outputText && (
            <div className="p-4 bg-slate-900 border border-slate-800 text-slate-100 rounded-xl font-mono text-sm flex justify-between items-center">
              <span className="text-green-400 font-bold tracking-wider select-all">{outputText}</span>
              <button
                id="copy_pass_result_btn"
                onClick={() => handleCopy(outputText)}
                className="text-xs text-blue-400 font-bold flex items-center gap-1"
              >
                Copy Key
              </button>
            </div>
          )}
        </div>
      );
    }

    // 5. LOREM IPSUM PARAGRAPHS GENERATOR
    if (slug === 'lorem-ipsum-generator') {
      return (
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 font-sans">Lorem Ipsum criteria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Dummy Layout Type</label>
                <select
                  id="lorem_type_select"
                  value={loremType}
                  onChange={(e) => setLoremType(e.target.value as any)}
                  className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="paragraphs">Paragraphs markup block</option>
                  <option value="sentences">Single Sentences list</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Generate Count</label>
                <input
                  id="lorem_count_input"
                  type="number"
                  min="1"
                  max="10"
                  value={loremCount}
                  onChange={(e) => setLoremCount(parseInt(e.target.value) || 1)}
                  className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>
            <button
              id="generate_lorem_btn"
              onClick={generateLoremIpsum}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
            >
              Compile Placeholder Dummy Text
            </button>
          </div>

          {outputText && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase">Lorem Output</span>
                <button
                  id="copy_lorem_result_btn"
                  onClick={() => handleCopy(outputText)}
                  className="text-xs text-blue-600 font-bold"
                >
                  Copy Markups
                </button>
              </div>
              <textarea
                id="lorem_output_textarea"
                readOnly
                value={outputText}
                className="w-full h-56 p-3 bg-white border border-slate-300 text-slate-700 text-xs leading-relaxed rounded-xl font-mono focus:outline-none"
              />
            </div>
          )}
        </div>
      );
    }

    // 6. SLUG GENERATOR
    if (slug === 'slug-generator') {
      return (
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-slate-600">Enter Plain text header:</span>
            <input
              id="slug_input_text"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="E.g. Dynamic SEO Tools with React Router 2026!"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-mono"
            />
          </div>
          <button
            id="generate_slug_btn"
            onClick={generateURLSlug}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
          >
            Generate Alphanumeric URL Slug
          </button>

          {outputText && (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-sm font-mono flex items-center justify-between">
              <span className="text-amber-400 select-all font-bold">{outputText}</span>
              <button
                id="copy_slug_btn"
                onClick={() => handleCopy(outputText)}
                className="text-xs text-blue-400 font-bold"
              >
                Copy URL Slug
              </button>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
      {renderSelectedTool()}
    </div>
  );
}
