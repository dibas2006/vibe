
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { JournalEntry } from '../types';

const JournalView: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const handleSave = async () => {
    if (!entry.trim()) return;
    setIsAnalyzing(true);
    const analysis = await GeminiService.analyzeJournal(entry);
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: entry,
      timestamp: Date.now(),
      actionableAdvice: analysis?.actionableAdvice,
      mood: analysis?.mood || 'Neutral',
      sentimentScore: analysis?.sentimentScore || 5,
      triggers: analysis?.triggers || []
    };

    setEntries([newEntry, ...entries]);
    setEntry('');
    setIsAnalyzing(false);
  };

  const getSentimentColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass p-8 rounded-2xl border border-slate-800">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic">Tactical Reflection</h3>
          <p className="text-slate-400 text-[10px] mb-6 uppercase tracking-widest">Automatic sentiment & trigger analysis protocol.</p>
          
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full h-48 bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-slate-200 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none font-mono text-sm"
            placeholder="Log your state..."
          />
          
          <button
            onClick={handleSave}
            disabled={isAnalyzing || !entry.trim()}
            className="mt-6 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
          >
            {isAnalyzing ? "Analyzing Sentiment..." : "Post Reflection"}
          </button>
        </div>

        <div className="space-y-4">
          {entries.map(e => (
            <div key={e.id} className="glass p-6 rounded-xl border border-slate-800 bg-slate-900/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase">{new Date(e.timestamp).toLocaleString()}</span>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-black uppercase ${getSentimentColor(e.sentimentScore)}`}>
                    Sentiment: {e.sentimentScore}/10
                  </span>
                  <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase border border-indigo-500/20">{e.mood}</span>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-6 font-medium italic">"{e.content}"</p>
              
              {e.actionableAdvice && (
                <div className="p-5 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
                  <div className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Direct Action Required:</div>
                  <p className="text-xs text-indigo-200 leading-relaxed font-mono">{e.actionableAdvice}</p>
                </div>
              )}

              {e.triggers.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.triggers.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[9px] font-bold uppercase border border-red-500/20">
                      Trigger: {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Sentiment Trend</h4>
          <div className="flex items-end gap-2 h-20 mb-4 px-2">
            {entries.slice(0, 7).reverse().map((e, i) => (
              <div 
                key={i} 
                className={`w-full rounded-t-sm transition-all ${getSentimentColor(e.sentimentScore).replace('text-', 'bg-')}`} 
                style={{ height: `${e.sentimentScore * 10}%` }}
              />
            ))}
            {entries.length === 0 && <div className="text-slate-600 text-[10px] font-mono w-full text-center pb-8">NO DATA POINTS</div>}
          </div>
          <div className="text-[9px] text-slate-500 font-mono text-center uppercase">Last 7 Sessions</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-red-500/10 bg-red-500/5">
           <h4 className="text-[10px] font-black text-red-500 uppercase mb-2">Relapse Detection</h4>
           <p className="text-[10px] text-slate-400 leading-tight">
             Automated monitoring active. AI will flag recurrent negative triggers across entries.
           </p>
        </div>
      </div>
    </div>
  );
};

export default JournalView;
