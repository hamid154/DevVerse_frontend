import React, { createContext, useContext, useState, ReactNode } from 'react';
import { askAI } from '../utils/ai';

export interface RoadmapStep {
  day: string;
  title: string;
  desc: string;
  tasks: string[];
}

interface RoadmapContextType {
  topic: string;
  setTopic: (v: string) => void;
  duration: string;
  setDuration: (v: string) => void;
  customDuration: string;
  setCustomDuration: (v: string) => void;
  detailLevel: string;
  setDetailLevel: (v: string) => void;
  loading: boolean;
  error: string | null;
  roadmap: RoadmapStep[] | null;
  generateRoadmap: (e: React.FormEvent) => Promise<void>;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('30 Days');
  const [customDuration, setCustomDuration] = useState('');
  const [detailLevel, setDetailLevel] = useState('Detailed');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);

  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    const finalDuration = duration === 'Custom' ? customDuration : duration;
    if (duration === 'Custom' && !customDuration.trim()) {
        setError("Please format your custom timeframe (e.g., '14 Days' or '3 Months').");
        return;
    }

    setLoading(true);
    setError(null);
    setRoadmap(null);

    let promptInstruction = '';
    
    if (detailLevel === 'Detailed') {
        promptInstruction = `
        I need you to provide deep, actionable details. For each "task", explain HOW to learn it, WHERE to install things, WHICH projects to build, and EASY step-by-step ways to understand. Treat the user like a beginner who needs hand-holding.
        
        The JSON schema must be exactly this array of objects:
        [
          {
            "day": "Timeframe (e.g. Week 1: Setup & Basics)",
            "title": "Main Goal/Theme",
            "desc": "Detailed description of the focus for this period.",
            "tasks": [
              "📥 Installation: [Exact link or command to install and how to set it up]",
              "📖 Reading: [Specific chapters or exact YouTube search terms to study]",
              "🛠️ Project: [Exact project idea and 3 steps on how to build it]",
              "💡 Pro-Tip: [Easy way to remember or master this step]"
            ]
          }
        ]
        Provide a logical sequence of about 6-10 highly detailed steps.
        `;
    } else {
        promptInstruction = `
        Provide a concise, high-level summary. I just need a quick overview of what topics to cover. 
        Keep it brief so the user can save time and skim through it quickly.
        
        The JSON schema must be exactly this array of objects:
        [
          {
            "day": "Timeframe",
            "title": "Main Topic",
            "desc": "Short 1-sentence summary.",
            "tasks": [
              "Goal 1",
              "Goal 2"
            ]
          }
        ]
        Provide a logical sequence of exactly 4-6 brief steps.
        `;
    }

    const prompt = `
      Act as an expert technical mentor. Generate a structured learning roadmap for mastering "${topic}" in "${finalDuration}". 
      You MUST return ONLY raw valid JSON representing an array of objects. Do not wrap it in markdown codeblocks (do not use \`\`\`json).
      ${promptInstruction}
    `;

    try {
      const responseText = await askAI(prompt);
      
      let cleanJson = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      
      const parsedData = JSON.parse(cleanJson) as RoadmapStep[];
      
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
          throw new Error("Invalid output format from AI.");
      }

      setRoadmap(parsedData);
    } catch (err: any) {
      console.error('Roadmap error mapping JSON:', err);
      setError("Failed to generate structural roadmap. The AI returned an invalid format or disconnected. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoadmapContext.Provider
      value={{
        topic,
        setTopic,
        duration,
        setDuration,
        customDuration,
        setCustomDuration,
        detailLevel,
        setDetailLevel,
        loading,
        error,
        roadmap,
        generateRoadmap
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}
