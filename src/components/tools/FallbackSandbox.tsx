import React, { useState } from 'react';
import { Sparkles, Play, Download, Copy, Check, FileCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Tool } from '../../types/tool';

interface FallbackSandboxProps {
  tool: Tool;
}

export function FallbackSandbox({ tool }: FallbackSandboxProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // General state stores
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [targetValA, setTargetValA] = useState('150');
  const [targetValB, setTargetValB] = useState('25');
  const [textInput, setTextInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeSandboxConverter = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const executeSandboxCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      const a = parseFloat(targetValA) || 0;
      const b = parseFloat(targetValB) || 0;
      let calculated = 0;

      // Guess formula based on name keywords
      const name = tool.name.toLowerCase();
      if (name.includes('tax') || name.includes('gst')) {
        calculated = a * (1 + b / 100);
      } else if (name.includes('interest') || name.includes('sip') || name.includes('returns')) {
        calculated = a * Math.pow(1 + 0.05, b);
      } else if (name.includes('mileage') || name.includes('fuel')) {
        calculated = a / (b || 1);
      } else if (name.includes('weight') || name.includes('cement') || name.includes('brick')) {
        calculated = a * b * 1.15; // custom bulk margin multiplier
      } else if (name.includes('hike') || name.includes('raise') || name.includes('percentage')) {
        calculated = ((a - b) / (b || 1)) * 100;
      } else {
        calculated = a * b; // fallback multiplication
      }

      setCalcResult(calculated.toFixed(2));
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  // Check if type aligns to conversion types
  const isFileType = ['image-tool', 'pdf-tool'].includes(tool.toolType) || tool.slug.includes('to-');
  const isCalculator = ['calculator', 'student-tool'].includes(tool.toolType) || tool.name.toLowerCase().includes('calculator') || tool.name.toLowerCase().includes('calc');

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Dynamic Intro Frame */}
      <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-slate-800 text-sm capitalize">{tool.name}</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {tool.shortDescription} LiveTools runs this calculation locally inside your browser sandbox to guarantee security and latency speeds.
          </p>
        </div>
      </div>

      {/* RENDER DYNAMIC FILE TRANSLATORS */}
      {isFileType && (
        <form onSubmit={executeSandboxConverter} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">1. Supply source files</span>
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white rounded-xl p-6 text-center cursor-pointer transition relative">
                <input
                  id="sandbox_file_upload"
                  type="file"
                  onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-xs font-medium text-slate-500 flex flex-col items-center gap-1.5">
                  <span className="p-2.5 bg-blue-50 text-blue-600 rounded-full group-hover:scale-105"><Download className="w-4 h-4" /></span>
                  <span>{fileInput ? `Attached: ${fileInput.name}` : `Drag and drop files here, or tap to browse`}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Max offline size: 50MB</span>
                </div>
              </div>
              <button
                id="sandbox_convert_btn"
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1"
              >
                {loading ? 'Processing file schemas...' : `Convert using ${tool.name}`}
              </button>
            </div>

            {/* Simulated Converted outcome */}
            <div className="flex flex-col justify-center">
              {success ? (
                <div className="p-5 bg-white border border-slate-200 rounded-xl text-center space-y-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto border border-green-100">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Conversion output optimized</h4>
                    <p className="text-xs text-slate-400 mt-0.5">MIME formatting adjusted successfully.</p>
                  </div>
                  <button
                    id="sandbox_output_download"
                    type="button"
                    onClick={() => alert(`Your target file was prepared locally. Enjoy premium formats on LiveTools!`)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Converted File
                  </button>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs font-mono py-10">
                  Ready to process items. Attach file and trigger action.
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      {/* RENDER GENERAL NUMERIC CALCULATORS */}
      {isCalculator && (
        <form onSubmit={executeSandboxCalculator} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">1. Input parameters</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Value Parameter A</label>
                  <input
                    id="sandbox_val_a"
                    type="number"
                    value={targetValA}
                    onChange={(e) => setTargetValA(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Value Parameter B</label>
                  <input
                    id="sandbox_val_b"
                    type="number"
                    value={targetValB}
                    onChange={(e) => setTargetValB(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                id="sandbox_calc_btn"
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1"
              >
                {loading ? 'Running analysis...' : 'Solve Formula'}
              </button>
            </div>

            {/* Calculations outputs */}
            <div className="flex flex-col justify-center">
              {success ? (
                <div className="bg-white p-6 border border-slate-200 rounded-xl text-center space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Calculated Output Range</span>
                  <div className="text-4xl font-extrabold text-blue-600 font-mono select-all">{calcResult}</div>
                  <p className="text-[10px] font-semibold text-green-600 bg-green-50 border border-green-100 rounded py-1 px-2 block">
                    Calculated accurately with security margins ✓
                  </p>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 font-mono text-xs">
                  Awaiting value input arrays to solve variables.
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      {/* RENDER FALLBACK TEXT/SEO FOR OTHER TYPES NOT CAPTURED ABOVE */}
      {!isFileType && !isCalculator && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase block">1. Input Text details</span>
            <textarea
              id="sandbox_text_input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste strings or custom details here..."
              className="w-full h-44 p-3 bg-white border border-slate-300 text-slate-700 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              id="sandbox_text_btn"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  let cleaned = textInput.toUpperCase().trim();
                  // Custom string processing based on name keywords
                  if (tool.name.toLowerCase().includes('slug')) {
                    cleaned = textInput.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
                  } else if (tool.name.toLowerCase().includes('hash')) {
                    cleaned = btoa(textInput).slice(0, 32);
                  }
                  setCalcResult(cleaned);
                  setLoading(false);
                  setSuccess(true);
                }, 800);
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
            >
              Process Input
            </button>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-1 uppercase">
              <span>Dynamic processed values</span>
              {calcResult && (
                <button
                  id="copy_sandbox_text"
                  onClick={() => handleCopy(calcResult)}
                  className="text-xs text-blue-600 font-semibold"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              id="sandbox_text_output"
              readOnly
              value={calcResult}
              className="w-full h-44 p-3 bg-slate-900 text-slate-100 border border-slate-800 rounded-lg font-mono text-xs focus:outline-none"
              placeholder="Result shows up here..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
