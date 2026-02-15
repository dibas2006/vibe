
export enum ToolType {
  DASHBOARD = 'DASHBOARD',
  ROUTINE = 'ROUTINE',
  TRAINING = 'TRAINING',
  ACADEMICS = 'ACADEMICS',
  ANALYTICS = 'ANALYTICS',
  COMMAND_CHAT = 'COMMAND_CHAT',
  PHYSIQUE_LOG = 'PHYSIQUE_LOG',
  MISSION_SIM = 'MISSION_SIM',
  VOCAL_OPS = 'VOCAL_OPS',
  JOURNAL = 'JOURNAL',
  FOCUS = 'FOCUS'
}

export interface RoutineTask {
  id: string;
  time: string;
  task: string;
  category: 'academic' | 'fitness' | 'skill' | 'rest';
  completed: boolean;
  isCritical: boolean;
}

export interface JournalEntry {
  id: string;
  content: string;
  timestamp: number;
  aiInsight?: string;
  mood: string;
  sentimentScore: number; // 1-10
  actionableAdvice: string;
  triggers: string[];
}

export interface PhysiquePost {
  id: string;
  imageUrl: string;
  timestamp: number;
  note: string;
}

export interface FitnessLog {
  date: string;
  runTime: string;
  pushups: number;
  situps: number;
  heaves: number;
}

export interface WeeklyAnalysis {
  disciplineScore: number;
  physicalReadiness: number;
  academicProgress: number;
  aiSummary: string;
  weakness: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  groundingSources?: { uri: string; title: string }[];
}

export interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

// Added missing interface for image generation
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
    webkitAudioContext: typeof AudioContext;
  }
}