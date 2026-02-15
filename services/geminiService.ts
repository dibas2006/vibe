
import { GoogleGenAI, Type } from "@google/genai";

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  static async getCommandBrief(stats: string) {
    const ai = this.getAI();
    const prompt = `Act as an elite British Army DS (Directing Staff). Analyze these stats: ${stats}. 
    Provide a 2-sentence tactical directive for today. Identify ONE critical weakness.
    Format your response as a JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            directive: { type: Type.STRING },
            weakness: { type: Type.STRING },
            focusTopic: { type: Type.STRING }
          },
          required: ["directive", "weakness", "focusTopic"]
        }
      },
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) { return null; }
  }

  static async analyzeJournal(content: string) {
    const ai = this.getAI();
    const prompt = `Analyze this student-soldier's journal entry: "${content}". 
    Evaluate sentiment from 1-10 (10 being peak motivation, 1 being extreme burnout).
    Identify triggers and provide ONE specific, actionable piece of advice for the next 24 hours.
    Format your response as a JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mood: { type: Type.STRING },
            sentimentScore: { type: Type.NUMBER },
            triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionableAdvice: { type: Type.STRING }
          },
          required: ["mood", "sentimentScore", "triggers", "actionableAdvice"]
        }
      },
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) { return null; }
  }

  static async generateRoutine(profile: string) {
    const ai = this.getAI();
    const prompt = `Generate a strict daily routine for: ${profile}. Return a JSON object with a list of tasks.`;
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  task: { type: Type.STRING },
                  category: { type: Type.STRING },
                  isCritical: { type: Type.BOOLEAN }
                },
                required: ["time", "task", "category", "isCritical"]
              }
            }
          },
          required: ["tasks"]
        }
      },
    });
    try {
      return JSON.parse(response.text || '{"tasks": []}');
    } catch (e) { return { tasks: [] }; }
  }

  static async analyzeProgress(history: string) {
    const ai = this.getAI();
    const prompt = `Analyze the performance history of this student-soldier: ${history}. Return JSON report.`;
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            disciplineScore: { type: Type.NUMBER },
            physicalReadiness: { type: Type.NUMBER },
            academicProgress: { type: Type.NUMBER },
            aiSummary: { type: Type.STRING },
            weakness: { type: Type.STRING }
          },
          required: ["disciplineScore", "physicalReadiness", "academicProgress", "aiSummary", "weakness"]
        }
      },
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) { return null; }
  }

  static async chatWithSearch(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({ uri: chunk.web!.uri, title: chunk.web!.title || chunk.web!.uri })) || [];
    return { text: response.text || '', sources };
  }

  // Added generateImage method using gemini-2.5-flash-image
  static async generateImage(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });
    
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64EncodeString}`;
        }
      }
    }
    throw new Error('Failed to generate image');
  }

  static async generateVideo(prompt: string) {
    const ai = this.getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  static async textToSpeech(text: string, voiceName: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  }
}