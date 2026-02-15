
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { GeneratedImage } from '../types';

const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const url = await GeminiService.generateImage(prompt);
      const newImg: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now(),
      };
      setImages(prev => [newImg, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-2xl border border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-2">Create New Image</h3>
        <p className="text-slate-400 text-sm mb-6">Describe the image you want to see. High-fidelity results in seconds.</p>
        
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
            placeholder="e.g. A futuristic cyberpunk city in rain, neon colors, cinematic lighting, ultra detailed..."
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              'Create Image'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative glass rounded-2xl overflow-hidden border border-slate-800">
            <img src={img.url} alt={img.prompt} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="text-xs text-slate-300 line-clamp-2 mb-2">{img.prompt}</p>
              <button 
                onClick={() => {
                    const link = document.createElement('a');
                    link.href = img.url;
                    link.download = `aura-img-${img.id}.png`;
                    link.click();
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
