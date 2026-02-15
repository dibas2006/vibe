
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { GeneratedVideo } from '../types';

const VideoView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    // Fix: Using optional chaining for aistudio property access
    const selected = await window.aistudio?.hasSelectedApiKey();
    setHasKey(!!selected);
  };

  const handleOpenKeyPicker = async () => {
    // Fix: Using optional chaining for aistudio method call
    await window.aistudio?.openSelectKey();
    setHasKey(true); // Proceed as per instructions (assume success after triggering)
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setStatusMessage('Preparing cinematic sequence...');
    
    try {
      const messages = [
        'Igniting creative engine...',
        'Synthesizing frames...',
        'Rendering textures...',
        'Polishing cinematic effects...',
        'Almost there...'
      ];
      
      let msgIdx = 0;
      const interval = setInterval(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        setStatusMessage(messages[msgIdx]);
      }, 8000);

      const url = await GeminiService.generateVideo(prompt);
      clearInterval(interval);
      
      const newVid: GeneratedVideo = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now(),
      };
      setVideos(prev => [newVid, ...prev]);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found')) {
        setHasKey(false);
      }
      alert('Video generation failed. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
      setStatusMessage('');
    }
  };

  if (!hasKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Video Generation Requires a Paid Key</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Veo 3.1 is a high-performance model that requires a selected API key from a paid GCP project.
          </p>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-400 text-sm hover:underline mt-2 inline-block">Learn about billing</a>
        </div>
        <button
          onClick={handleOpenKeyPicker}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all"
        >
          Select API Key
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="glass p-8 rounded-2xl border border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-2">Cinematic Video Creation</h3>
        <p className="text-slate-400 text-sm mb-6">Describe a scene. Veo 3.1 will generate a high-quality video clip.</p>
        
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
            placeholder="e.g. A neon hologram of a cat driving a sports car at top speed through a futuristic city tunnel, camera following closely behind, 4k cinematic style..."
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {statusMessage}
              </>
            ) : (
              'Generate Video'
            )}
          </button>
        </div>
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center justify-center p-12 glass rounded-2xl border border-indigo-500/30 animate-pulse">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-indigo-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-slate-300 font-medium">Wait a few minutes while we craft your masterpiece...</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="glass rounded-2xl overflow-hidden border border-slate-800 group">
            <div className="aspect-video bg-black relative">
              <video 
                src={vid.url} 
                controls 
                className="w-full h-full"
                poster="https://picsum.photos/1280/720"
              />
            </div>
            <div className="p-4 bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-2 italic">"{vid.prompt}"</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{new Date(vid.timestamp).toLocaleString()}</span>
                <a 
                  href={vid.url} 
                  download 
                  className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
                >
                  Download MP4
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoView;
