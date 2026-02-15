
import React, { useState, useRef } from 'react';
import { PhysiquePost } from '../types';

const PhysiqueView: React.FC = () => {
  const [posts, setPosts] = useState<PhysiquePost[]>([]);
  const [note, setNote] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPost: PhysiquePost = {
          id: Date.now().toString(),
          imageUrl: reader.result as string,
          timestamp: Date.now(),
          note: note || "Daily Progress Log"
        };
        setPosts([newPost, ...posts]);
        setNote('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="glass p-8 rounded-2xl border border-slate-800">
        <h3 className="text-xl font-bold uppercase italic mb-2">Physique Protocol</h3>
        <p className="text-slate-400 text-[10px] mb-6 uppercase tracking-widest">Army fitness standards require visual accountability.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none font-mono"
              placeholder="Enter daily notes (Bodyweight, BF%, or Mood)..."
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Upload Visual Report
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
          
          <div className="flex items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-900/50 p-10 text-center">
            <div className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">
              Awaiting Capture...
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="glass rounded-2xl overflow-hidden border border-slate-800 group relative">
            <img src={post.imageUrl} className="w-full aspect-[4/5] object-cover" alt="Physique Update" />
            <div className="absolute inset-x-0 bottom-0 p-4 glass bg-slate-950/80 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
               <div className="text-[9px] font-mono text-indigo-400 mb-1 uppercase">{new Date(post.timestamp).toDateString()}</div>
               <p className="text-xs text-white line-clamp-2">{post.note}</p>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full py-20 text-center glass border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-600 uppercase font-black text-[10px] tracking-widest">No Logs Found In Recon Archives</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysiqueView;
