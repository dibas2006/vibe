
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { RoutineTask } from '../types';

const RoutineView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [tasks, setTasks] = useState<RoutineTask[]>([
    { id: '1', time: '05:00', task: 'Wake up & Hydrate', category: 'rest', completed: true, isCritical: true },
    { id: '2', time: '05:30', task: 'RFT Run (5km Tempo)', category: 'fitness', completed: true, isCritical: false },
    { id: '3', time: '07:00', task: 'Discrete Math Revision', category: 'academic', completed: false, isCritical: true },
    { id: '4', time: '09:00', task: 'Full-stack Development (React)', category: 'skill', completed: false, isCritical: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const generateNewRoutine = async () => {
    setIsGenerating(true);
    const profile = "BSC CSIT student, British Army candidate, focus on DSA and running.";
    const result = await GeminiService.generateRoutine(profile);
    if (result.tasks) {
      setTasks(result.tasks.map((t: any, i: number) => ({ ...t, id: i.toString(), completed: false })));
    }
    setIsGenerating(false);
  };

  const visibleTasks = emergencyMode ? tasks.filter(t => t.isCritical) : tasks;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold uppercase italic">Tactical Routine</h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">Execute or adapt to survive.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${emergencyMode ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-400'}`}
          >
            {emergencyMode ? 'Emergency Active' : 'Emergency Protocol'}
          </button>
          <button 
            onClick={generateNewRoutine}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black uppercase transition-all"
          >
            AI Recalculate
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {visibleTasks.map((t) => (
          <div 
            key={t.id} 
            onClick={() => toggleTask(t.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
              t.completed ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-800/40 border-indigo-500/20 hover:border-indigo-500/50'
            }`}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${t.completed ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>
              {t.completed && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <div className="w-16 font-mono text-xs text-indigo-400">{t.time}</div>
            <div className="flex-1 text-sm font-medium">{t.task}</div>
            {t.isCritical && <div className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[8px] font-black uppercase">Critical</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineView;
