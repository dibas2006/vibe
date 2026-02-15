
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { WeeklyAnalysis } from '../types';

const AnalyticsView: React.FC = () => {
  // Fix: Added missing 'weakness' property to initial state to match WeeklyAnalysis interface
  const [analysis, setAnalysis] = useState<WeeklyAnalysis | null>({
    disciplineScore: 88,
    physicalReadiness: 72,
    academicProgress: 91,
    aiSummary: "You have demonstrated exceptional focus on Operating Systems this week. However, your push-up volume has plateaued; consider increasing your nightly reps by 10%. Tactical readiness for the British Army remains within acceptable parameters.",
    weakness: "Upper body strength plateau"
  });
  const [loading, setLoading] = useState(false);

  const triggerAnalysis = async () => {
    setLoading(true);
    const history = "Week 4: 95% routine completion, missed 1 training session, completed 2 OS assignments, 2km run improved by 10s.";
    const result = await GeminiService.analyzeProgress(history);
    if (result) setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Performance Intelligence</h2>
          <p className="text-slate-500 text-xs">Algorithmic analysis of your student-soldier journey.</p>
        </div>
        <button 
          onClick={triggerAnalysis}
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-xs font-bold uppercase transition-all"
        >
          {loading ? 'Analyzing...' : 'Generate Intelligence Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Discipline', val: analysis?.disciplineScore, color: 'text-indigo-400' },
          { label: 'Physical Readiness', val: analysis?.physicalReadiness, color: 'text-amber-400' },
          { label: 'Academic Mastery', val: analysis?.academicProgress, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-2xl border border-slate-800 text-center">
            <div className="relative inline-block mb-4">
               <svg className="w-24 h-24 transform -rotate-90">
                 <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                 <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" 
                   strokeDasharray={251} strokeDashoffset={251 - (251 * (stat.val || 0)) / 100}
                   className={stat.color} 
                 />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center font-mono text-xl">{stat.val}%</div>
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 relative">
        <div className="absolute top-4 left-4 text-indigo-500/20">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div className="relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4">AI Tactical Brief</h3>
          <p className="text-lg font-medium italic leading-relaxed text-slate-200">
            "{analysis?.aiSummary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
