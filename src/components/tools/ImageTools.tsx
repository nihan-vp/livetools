import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, Download, Copy, Check, Sliders, Palette, FileCode, CheckCircle2 } from 'lucide-react';

interface ImageToolProps {
  slug: string;
}

export function ImageTools({ slug }: ImageToolProps) {
  // Common states
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [outputUrl, setOutputUrl] = useState<string>('');
  const [outputFileName, setOutputFileName] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Compressor states
  const [quality, setQuality] = useState<number>(0.8);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  // Resizer states
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);

  // Color picker states
  const [selectedColor, setSelectedColor] = useState<string>('#3b82f6');
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Base64 states
  const [base64Text, setBase64Text] = useState<string>('');
  const [textToBase64Input, setTextToBase64Input] = useState<string>('');

  // Clean previews on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('data:')) {
        URL.revokeObjectURL(previewUrl);
      }
      if (outputUrl && !outputUrl.startsWith('data:')) {
        URL.revokeObjectURL(outputUrl);
      }
    };
  }, [previewUrl, outputUrl]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setOriginalSize(selected.size);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
      setOutputUrl('');
      setCompressedSize(0);

      // Load dimensions for resizing & color picking
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);

        // Prepopulate color palette extraction if needed
        extractColors(img);
      };
      img.src = url;
    }
  };

  // Automated color extractor for dynamic canvas
  const extractColors = (img: HTMLImageElement) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      const imgData = ctx.getImageData(0, 0, 50, 50).data;
      
      const colors: Record<string, number> = {};
      for (let i = 0; i < imgData.length; i += 16) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        colors[hex] = (colors[hex] || 0) + 1;
      }
      
      const sorted = Object.keys(colors).sort((a, b) => colors[b] - colors[a]);
      // set top 5 vibrant colors
      setExtractedPalette(sorted.slice(0, 6));
    } catch (err) {
      console.warn('Extract colors failed context', err);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
    setSelectedColor(hex);
  };

  // Dynamic Image Converter Execution
  const runConversion = (targetFormat: 'jpeg' | 'png' | 'webp') => {
    if (!file || !previewUrl) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setLoading(false);
        return;
      }

      // Handle PNG white backdrop for conversion into JPEG
      if (targetFormat === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      const mineType = `image/${targetFormat}`;
      const dataUrl = canvas.toDataURL(mineType, targetFormat === 'jpeg' ? quality : undefined);
      
      setOutputUrl(dataUrl);
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
      setOutputFileName(`${nameWithoutExt}.${targetFormat}`);
      setLoading(false);
    };
    img.src = previewUrl;
  };

  // Image Compressor Execution
  const runCompression = () => {
    if (!file || !previewUrl) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const format = file.type === 'image/png' ? 'image/jpeg' : file.type; // Compress PNG by transforming to lossy JPEG or WebP
        canvas.toBlob((blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setOutputUrl(URL.createObjectURL(blob));
            setOutputFileName(`compressed_${file.name.replace(/\.[^/.]+$/, "")}.${format.split('/')[1]}`);
          }
          setLoading(false);
        }, format, quality);
      } else {
        setLoading(false);
      }
    };
    img.src = previewUrl;
  };

  // Image Resizer Execution
  const runResize = () => {
    if (!file || !previewUrl) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            setOutputUrl(URL.createObjectURL(blob));
            setOutputFileName(`resized_${file.name}`);
          }
          setLoading(false);
        }, file!.type);
      } else {
        setLoading(false);
      }
    };
    img.src = previewUrl;
  };

  // Image to Base64 Execution
  const runImageToBase64 = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Text(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Base64 to Image Execution
  const runBase64ToImage = () => {
    if (!base64Text.trim()) return;
    setOutputUrl(base64Text.trim());
    setOutputFileName('decoded_image.png');
  };

  useEffect(() => {
    if (file && slug === 'image-to-base64') {
      runImageToBase64();
    }
  }, [file, slug]);

  const drawColorPickerCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !previewUrl) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Scale canvas aspect ratio to hold preview nicely
      const maxDim = 400;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
    };
    img.src = previewUrl;
  };

  useEffect(() => {
    if (slug === 'image-color-picker' && previewUrl) {
      drawColorPickerCanvas();
    }
  }, [previewUrl, slug]);

  // Utilities to format bytes nicely
  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Render correct tool based on slug
  const renderSelectedTool = () => {
    const isConverter = ['png-to-jpg', 'jpg-to-png', 'png-to-webp', 'webp-to-png', 'jpg-to-webp', 'webp-to-jpg'].includes(slug);

    if (isConverter) {
      const getTargetExtension = () => {
        if (slug.endsWith('jpg')) return 'jpeg';
        if (slug.endsWith('png')) return 'png';
        if (slug.endsWith('webp')) return 'webp';
        return 'jpeg';
      };

      const targetExt = getTargetExtension();

      return (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Choose your image details</h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full max-w-sm">
                <label className="block text-sm font-medium text-slate-600 mb-2">Upload Source File</label>
                <input
                  id="image_conv_upload_input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {file && (
                <button
                  id="image_conv_btn"
                  onClick={() => runConversion(targetExt as any)}
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 font-medium text-white rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400"
                >
                  {loading ? 'Converting image...' : `Convert to ${targetExt.toUpperCase()}`}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewUrl && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase mb-2">Original Preview ({formatBytes(originalSize)})</span>
                <img src={previewUrl} className="max-h-64 object-contain rounded-lg shadow-sm border border-slate-100" />
              </div>
            )}
            {outputUrl && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
                <span className="text-xs font-semibold text-green-500 uppercase mb-2">Converted Output ({targetExt.toUpperCase()})</span>
                <img src={outputUrl} className="max-h-64 object-contain rounded-lg shadow-sm border border-slate-100 mb-4" />
                <a
                  id="image_conv_download_btn"
                  href={outputUrl}
                  download={outputFileName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                  <Download className="w-4 h-4" /> Download Conversions
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (slug === 'image-compressor') {
      return (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Optimize Compresses Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Upload Image File</label>
                <input
                  id="compressor_file_input"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Compression Quality Level:</span>
                  <span className="font-semibold text-blue-600">{Math.round(quality * 100)}%</span>
                </div>
                <input
                  id="compressor_quality_slider"
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
            {file && (
              <div className="pt-2">
                <button
                  id="compress_submit_btn"
                  onClick={runCompression}
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 font-medium text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? 'Compressing...' : 'Start Compressing Image'}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewUrl && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase mb-2">Original File size</span>
                <span className="text-lg font-bold text-slate-700 mb-2">{formatBytes(originalSize)}</span>
                <img src={previewUrl} className="max-h-64 object-contain rounded-lg border border-slate-100" />
              </div>
            )}
            {outputUrl && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
                <div className="text-center mb-2">
                  <span className="text-xs font-semibold text-green-500 uppercase">Compressed File size</span>
                  <div className="text-lg font-bold text-green-600">
                    {formatBytes(compressedSize)}
                    <span className="text-xs font-normal text-slate-500 ml-2">
                      ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}% Smaller!)
                    </span>
                  </div>
                </div>
                <img src={outputUrl} className="max-h-64 object-contain rounded-lg border border-slate-100 mb-4" />
                <a
                  id="download_compressor_btn"
                  href={outputUrl}
                  download={outputFileName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                  <Download className="w-4 h-4" /> Download Compressed Image
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (slug === 'image-resizer') {
      const handleWidthChange = (val: number) => {
        setWidth(val);
        if (aspectRatioLocked && originalWidth > 0) {
          setHeight(Math.round(val * (originalHeight / originalWidth)));
        }
      };

      const handleHeightChange = (val: number) => {
        setHeight(val);
        if (aspectRatioLocked && originalHeight > 0) {
          setWidth(Math.round(val * (originalWidth / originalHeight)));
        }
      };

      return (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Resize Dimension Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Load Design File</label>
                <input
                  id="resizer_file_input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {file && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Width (px)</label>
                    <input
                      id="resizer_width_input"
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Height (px)</label>
                    <input
                      id="resizer_height_input"
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      id="resizer_aspect_ratio_checkbox"
                      type="checkbox"
                      checked={aspectRatioLocked}
                      onChange={(e) => setAspectRatioLocked(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-500">Lock Aspect Ratio ({originalWidth}x{originalHeight})</span>
                  </div>
                </div>
              )}
            </div>

            {file && (
              <button
                id="resize_submit_btn"
                onClick={runResize}
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                {loading ? 'Resizing...' : 'Resize Now'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewUrl && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase mb-2">Original Layout Size</span>
                <span className="text-lg font-bold text-slate-700 mb-2">{originalWidth} x {originalHeight} px</span>
                <img src={previewUrl} className="max-h-64 object-contain rounded-lg border border-slate-100" />
              </div>
            )}
            {outputUrl && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
                <span className="text-xs font-semibold text-green-500 uppercase mb-2">Resized Preview Size</span>
                <span className="text-lg font-bold text-green-600 mb-2">{width} x {height} px</span>
                <img src={outputUrl} className="max-h-64 object-contain rounded-lg border border-slate-100 mb-4" />
                <a
                  id="download_resizer_btn"
                  href={outputUrl}
                  download={outputFileName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                  <Download className="w-4 h-4" /> Download Resized File
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (slug === 'image-color-picker' || slug === 'color-extractor') {
      return (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Extract palette colors from custom uploads</h3>
            <input
              id="color_picker_file_input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase mb-3">Click onto Canvas to inspect Hex values</span>
              {previewUrl ? (
                <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                  <canvas
                    id="color_picker_canvas"
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="cursor-crosshair block max-w-full"
                  />
                </div>
              ) : (
                <div className="py-12 text-slate-400 text-sm flex flex-col items-center gap-2">
                  <Camera className="w-8 h-8 opacity-40 text-slate-400" />
                  <span>Please upload an image above to begin.</span>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Inspected Target Color</h4>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl border border-slate-200 shadow-inner"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div className="flex-1">
                    <div className="text-lg font-mono font-bold text-slate-700 uppercase">{selectedColor}</div>
                    <button
                      id="copy_inspected_color_btn"
                      onClick={() => handleCopy(selectedColor)}
                      className="mt-1 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied Hex!' : 'Copy HEX to clipboard'}
                    </button>
                  </div>
                </div>
              </div>

              {extractedPalette.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Vibrant Web Color Palette</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {extractedPalette.map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className="p-1 px-2 border border-slate-200 rounded-lg cursor-pointer hover:scale-102 transition bg-slate-50 flex items-center gap-2"
                      >
                        <div className="w-5 h-5 rounded border border-slate-300" style={{ backgroundColor: color }} />
                        <span className="font-mono text-[10px] md:text-xs font-bold text-slate-600 uppercase">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (slug === 'image-to-base64') {
      return (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Instant Image binary to Base64 String converter</h3>
            <input
              id="image_to_base64_file_input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {base64Text && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-700">Compiled MIME-type Base64 String ({formatBytes(base64Text.length)})</span>
                <button
                  id="copy_base64_string_btn"
                  onClick={() => handleCopy(base64Text)}
                  className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-lg flex items-center gap-1.5 hover:bg-blue-100"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Full Code'}
                </button>
              </div>
              <textarea
                id="base64_result_textarea"
                readOnly
                value={base64Text}
                className="w-full h-44 font-mono text-xs p-3 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      );
    }

    if (slug === 'base64-to-image') {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Paste your Base64 Data URI here:</label>
            <textarea
              id="base64_decode_input"
              value={base64Text}
              onChange={(e) => setBase64Text(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAA..."
              className="w-full h-36 font-mono text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              id="clear_decoder_btn"
              onClick={() => { setBase64Text(''); setOutputUrl(''); }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-lg transition"
            >
              Clear Values
            </button>
            <button
              id="base64_decode_submit_btn"
              onClick={runBase64ToImage}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition"
            >
              Convert Base64 to Image
            </button>
          </div>

          {outputUrl && (
            <div className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col items-center">
              <span className="text-xs font-semibold text-green-500 uppercase mb-3">Decoded Resulting Output</span>
              <img src={outputUrl} className="max-h-64 object-contain rounded-lg border border-slate-100 shadow-sm mb-4" />
              <a
                id="download_decoded_image_btn"
                href={outputUrl}
                download={outputFileName}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
              >
                <Download className="w-4 h-4" /> Download PNG Image File
              </a>
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
