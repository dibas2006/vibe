
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolSelect }) => {
  const primaryNav = [
    { type: ToolType.DASHBOARD, label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3' },
    { type: ToolType.ROUTINE, label: 'Daily Ops', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { type: ToolType.JOURNAL, label: 'Journal', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { type: ToolType.TRAINING, label: 'Army Prep', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { type: ToolType.ACADEMICS, label: 'CSIT Lab', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18' },
  ];

  const intelligenceNav = [
    { type: ToolType.ANALYTICS, label: 'Intel Report', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2' },
    { type: ToolType.COMMAND_CHAT, label: 'Command Chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { type: ToolType.FOCUS, label: 'Focus Mode', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { type: ToolType.PHYSIQUE_LOG, label: 'Physique Log', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <aside className="w-20 md:w-64 glass border-r border-slate-800 flex flex-col items-center md:items-stretch py-6 shrink-0 z-50">
      <div className="px-6 mb-8 hidden md:block">
        <h2 className="text-xl font-black tracking-tighter text-white flex items-center gap-2 italic">
          <span className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-xs not-italic">V</span>
          VANGUARD
        </h2>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto px-3">
        <div>
          <div className="px-4 mb-2 hidden md:block text-[10px] font-bold text-slate-600 tracking-[0.2em] uppercase">Operations</div>
          <nav className="space-y-1">
            {primaryNav.map((item) => (
              <button
                key={item.type}
                onClick={() => onToolSelect(item.type)}
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeTool === item.type ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                <span className="hidden md:block font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <div className="px-4 mb-2 hidden md:block text-[10px] font-bold text-slate-600 tracking-[0.2em] uppercase">Intelligence</div>
          <nav className="space-y-1">
            {intelligenceNav.map((item) => (
              <button
                key={item.type}
                onClick={() => onToolSelect(item.type)}
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeTool === item.type ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                <span className="hidden md:block font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
