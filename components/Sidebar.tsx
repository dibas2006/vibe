
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolSelect }) => {
  const navItems = [
    { type: ToolType.CHAT, label: 'Chat & Search', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { type: ToolType.IMAGE, label: 'Image Creator', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { type: ToolType.VIDEO, label: 'Veo Cinema', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { type: ToolType.SPEECH, label: 'Speech Synthesis', icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' },
  ];

  return (
    <aside className="w-20 md:w-64 glass border-r border-slate-800 flex flex-col items-center md:items-stretch py-8 shrink-0">
      <div className="px-6 mb-10 hidden md:block">
        <h2 className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">A</span>
          AURA
        </h2>
      </div>

      <nav className="flex-1 space-y-2 px-3">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onToolSelect(item.type)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTool === item.type 
                ? 'bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/50' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            <span className="hidden md:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-6 hidden md:block">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-500">
          Powered by Gemini 3.0 & Veo 3.1
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
