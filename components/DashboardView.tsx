
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

const DashboardView: React.FC = () => {
  const [brief, setBrief] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBrief() {
      const stats = "Streak: 14, Efficiency: 92%, Last Run: 09:45, Study: 45/60m OS Theory";
      const data = await GeminiService.getCommandBrief(stats);
      setBrief(data);
      setLoading(false);
    }
    loadBrief();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
      {/* AI Command Brief - The "Coach" */}
      <div className="lg:col-span-3 glass p-10 rounded-2xl border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded bg-indigo-600 text-[10px] font-black tracking-[0.2em] mb-4 uppercase">Command_Briefing</div>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-black mb-4 tracking-tighter italic uppercase">{brief?.directive || "AWAITING ORDERS"}</h2>
              <p className="text-slate-400 max-w-lg text-sm leading-relaxed mb-8">
                Identify: <span className="text-amber-500 font-bold uppercase">{brief?.weakness || "Calculating..."}</span>. 
                Focus today: <span className="text-indigo-400 font-bold">{brief?.focusTopic || "Mission Readiness"}</span>.
              </p>
            </>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Streak</div>
              <div className="text-2xl font-black font-mono">14d</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Efficiency</div>
              <div className="text-2xl font-black font-mono text-green-500">92%</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Intelligence</div>
              <div className="text-2xl font-black font-mono text-indigo-400">GOLD</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Tier</div>
              <div className="text-2xl font-black font-mono text-amber-500">ELITE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weakness Alert System */}
      <div className="space-y-6">
        <div className="glass p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-4 text-amber-500">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth={2}/></svg>
             <h3 className="text-[10px] font-black uppercase tracking-widest">Tactical Alert</h3>
          </div>
          <div className="text-sm font-bold text-slate-200 mb-2">Weakness Detected:</div>
          <p className="text-[11px] text-slate-400 leading-tight">
            "{brief?.weakness || "Analyzing data patterns..."}"
          </p>
          <button className="mt-4 w-full py-2 rounded-lg bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest">Acknowledge</button>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-800">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Focus Clock</h3>
          <div className="text-3xl font-mono text-center mb-2">25:00</div>
          <button className="w-full py-2 rounded bg-indigo-600 text-xs font-bold uppercase">Begin Session</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
