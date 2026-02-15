
export enum ToolType {
  CHAT = 'CHAT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  SPEECH = 'SPEECH'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  groundingSources?: Array<{ title: string; uri: string }>;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

// Global interface for window.aistudio
declare global {
  /**
   * Interface for the AIStudio environment object.
   * Defined globally to match expectations from the SDK and environment.
   */
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Fixed: Property 'aistudio' must be of type 'AIStudio' to match existing declarations.
    // The modifiers must also be identical; commonly this property is non-optional in this environment.
    aistudio: AIStudio;
    webkitAudioContext: typeof AudioContext;
  }
}
