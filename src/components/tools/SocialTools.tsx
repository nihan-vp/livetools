import React, { useState } from 'react';
import { Share2, Copy, Check, Tv, Sparkles, Heart } from 'lucide-react';

interface SocialToolProps {
  slug: string;
}

export function SocialTools({ slug }: SocialToolProps) {
  const [copied, setCopied] = useState(false);
  const [outputText, setOutputText] = useState('');

  // 1. YouTube embeds
  const [ytLink, setYtLink] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [ytAutoplay, setYtAutoplay] = useState(false);
  const [ytLoop, setYtLoop] = useState(false);

  // 2. Instagram bio parameters
  const [bioTone, setBioTone] = useState('creative');
  const [bioField, setBioField] = useState('Coding & Hiking');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compileYouTubeEmbed = () => {
    // Extract video id
    let videoId = 'dQw4w9WgXcQ';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = ytLink.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }

    let queryParams = `?autoplay=${ytAutoplay ? 1 : 0}&loop=${ytLoop ? 1 : 0}`;
    if (ytLoop) queryParams += `&playlist=${videoId}`;

    const embedCode = `<div class="youtube-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}${queryParams}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;"
    allowfullscreen>
  </iframe>
</div>`;

    setOutputText(embedCode);
  };

  const compileInstagramBio = () => {
    let bios: string[] = [];
    if (bioTone === 'creative') {
      bios = [
        `✨ Creating pixel adventures with ${bioField}
🚀 Chasing dreams and standard iterations
👇 Discover insights below:`,
        `💡 Full-Time Enthusiast of ${bioField}
🌱 Thriving inside standard offline loops
⚡ Tap into my universe:`
      ];
    } else {
      bios = [
        `💼 Professional focus: ${bioField}
📈 Solving global scale matrices
📩 Let's collaborate. Contact info below:`,
        `🎯 Dedicated specialist in ${bioField}
🚀 Delivering secure browser standards
💬 Direct queries or access details:`
      ];
    }
    setOutputText(bios.join('\n\n-- OR --\n\n'));
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" /> Social media suite
          </h3>

          {/* YOUTUBE EMBEDS */}
          {slug === 'youtube-embed-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">YouTube Video Link</label>
                <input
                  id="yt_link_input"
                  type="text"
                  value={ytLink}
                  onChange={(e) => setYtLink(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <input
                    id="yt_autoplay_checkbox"
                    type="checkbox"
                    checked={ytAutoplay}
                    onChange={(e) => setYtAutoplay(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  Autoplay video
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <input
                    id="yt_loop_checkbox"
                    type="checkbox"
                    checked={ytLoop}
                    onChange={(e) => setYtLoop(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  Loop video
                </label>
              </div>
              <button
                id="generate_yt_embed_btn"
                onClick={compileYouTubeEmbed}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Compile Responsive Embed Code
              </button>
            </div>
          )}

          {/* INSTAGRAM BIO */}
          {slug === 'instagram-bio-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">My Niche / Interests</label>
                <input
                  id="bio_niche_input"
                  type="text"
                  value={bioField}
                  onChange={(e) => setBioField(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tone Choice</label>
                <select
                  id="bio_tone_select"
                  value={bioTone}
                  onChange={(e) => setBioTone(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                >
                  <option value="creative">Creative with emojis ✨</option>
                  <option value="pro">Professional corporate 💼</option>
                </select>
              </div>
              <button
                id="generate_bio_btn"
                onClick={compileInstagramBio}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
              >
                Compile Emoji Bio Patterns
              </button>
            </div>
          )}

          {/* OTHER CONFIGURES */}
          {!['youtube-embed-generator', 'instagram-bio-generator'].includes(slug) && (
            <div className="text-center text-slate-400 font-mono text-xs pt-12">
              Provides social caption presets, embeds formatting, calendar triggers, and bios.
            </div>
          )}
        </div>

        {/* Output Previews */}
        <div className="relative">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-1">
            <span>Resulting templates</span>
            {outputText && (
              <button
                id="copy_social_tag_btn"
                onClick={() => handleCopy(outputText)}
                className="text-xs text-blue-600 font-bold hover:text-blue-800"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            id="social_output_textarea"
            readOnly
            value={outputText}
            className="w-full h-64 p-3 bg-slate-900 text-slate-200 border border-slate-800 rounded-xl font-mono text-[11px] leading-relaxed focus:outline-none"
            placeholder="Embed tags or stylish descriptions print out here. Configure fields and trigger compilers."
          />
        </div>
      </div>
    </div>
  );
}
