
import React, { useState, useCallback, useEffect } from 'react';
import { ToolType } from './types';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import ImageView from './components/ImageView';
import VideoView from './components/VideoView';
import SpeechView from './components/SpeechView';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.CHAT);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Navigation Sidebar */}
      <Sidebar activeTool={activeTool} onToolSelect={setActiveTool} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center px-8 glass shrink-0 z-10">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent capitalize">
            {activeTool.toLowerCase()} Studio
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            {activeTool === ToolType.CHAT && <ChatView />}
            {activeTool === ToolType.IMAGE && <ImageView />}
            {activeTool === ToolType.VIDEO && <VideoView />}
            {activeTool === ToolType.SPEECH && <SpeechView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
