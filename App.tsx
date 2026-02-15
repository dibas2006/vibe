
import React, { useState } from 'react';
import { ToolType } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import RoutineView from './components/RoutineView';
import TrainingView from './components/TrainingView';
import AcademicView from './components/AcademicView';
import AnalyticsView from './components/AnalyticsView';
import ChatView from './components/ChatView';
import PhysiqueView from './components/PhysiqueView';
import VideoView from './components/VideoView';
import SpeechView from './components/SpeechView';
import JournalView from './components/JournalView';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.DASHBOARD);

  const renderContent = () => {
    switch (activeTool) {
      case ToolType.DASHBOARD: return <DashboardView />;
      case ToolType.ROUTINE: return <RoutineView />;
      case ToolType.TRAINING: return <TrainingView />;
      case ToolType.ACADEMICS: return <AcademicView />;
      case ToolType.ANALYTICS: return <AnalyticsView />;
      case ToolType.COMMAND_CHAT: return <ChatView />;
      case ToolType.PHYSIQUE_LOG: return <PhysiqueView />;
      case ToolType.MISSION_SIM: return <VideoView />;
      case ToolType.VOCAL_OPS: return <SpeechView />;
      case ToolType.JOURNAL: return <JournalView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      <Sidebar activeTool={activeTool} onToolSelect={setActiveTool} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 glass shrink-0 z-40">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <h1 className="text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase">
                {activeTool.replace('_', ' ')} // PROTOCOL_ACTIVE
             </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-[10px] font-bold text-green-500 font-mono">UPLINK_STABLE</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scroll-smooth">
          <div className="max-w-6xl mx-auto h-full pb-20">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
