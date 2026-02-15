
import React, { useState, useRef } from 'react';
import { GeminiService, decode, decodeAudioData } from '../services/geminiService';

const SpeechView: React.FC = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState('Kore');
  const audioCtxRef = useRef<AudioContext | null>(null);

  const voices = [
    { name: 'Kore', gender: 'Female', desc: 'Warm and professional' },
    { name: 'Puck', gender: 'Male', desc: 'Playful and energetic' },
    { name: 'Charon', gender: 'Male', desc: 'Calm and deep' },
    { name: 'Fenrir', gender: 'Male', desc: 'Strong and authoritative' },
  ];

  const handleSpeak = async () => {
    if (!text.trim() || isSpeaking) return;

    setIsSpeaking(true);
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioCtxRef.current;
      
      const base64Audio = await GeminiService.textToSpeech(text, voice);
      const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
    } catch (err) {
      console.error(err);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="glass p-8 rounded-2xl border border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-2">Speech Synthesis</h3>
        <p className="text-slate-400 text-sm mb-6">Transform text into natural-sounding speech with expressive AI voices.</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {voices.map((v) => (
              <button
                key={v.name}
                onClick={() => setVoice(v.name)}
                className={`p-3 rounded-xl border transition-all text-left ${
                  voice === v.name 
                    ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-sm font-bold">{v.name}</div>
                <div className="text-[10px] opacity-60 uppercase">{v.gender}</div>
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
            placeholder="Enter the text you want Aura to read aloud..."
          />
          
          <button
            onClick={handleSpeak}
            disabled={isSpeaking || !text.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
          >
            {isSpeaking ? (
              <>
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-white animate-pulse" />
                  <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: '100ms' }} />
                  <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>
                Speaking...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
                Speak Text
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechView;
