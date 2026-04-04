import { useState } from 'react';
import Card from '../Card';
import { Zap, Heart, Brain, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export type GameMode = 'speed' | 'survival' | 'challenge';

interface Props {
  onSelectMode: (mode: GameMode, topic: string, difficulty: string) => void;
}

export default function GameModeSelector({ onSelectMode }: Props) {
  const [topic, setTopic] = useState('Full Stack Web Development');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Mixed');

  const categories = [
    "Full Stack Web Development",
    "React & Next.js",
    "Node.js Backend Architecture",
    "Python & Machine Learning",
    "Database Management (SQL/NoSQL)",
    "DevOps & Cyber Security",
    "Data Structures & Algorithms",
    "Cloud Computing (AWS/Azure)",
    "Custom Topic..."
  ];

  const difficulties = ["Beginner", "Intermediate", "Expert", "Mixed"];

  const handleModeSelect = (mode: GameMode) => {
    const finalTopic = topic === 'Custom Topic...' ? (customTopic.trim() || 'General Knowledge') : topic;
    onSelectMode(mode, finalTopic, difficulty);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in relative z-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white transition-colors duration-300">
          DevQuiz <span className="neon-text">Arcade</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-400">Configure your AI-powered combat simulation</p>
      </div>

      {/* AI Configure Filters */}
      <Card className="mb-12 p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-400 to-purple-500"></div>
        <div className="flex items-center mb-6">
          <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-gray-200">AI Challenge Parameters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic Selector */}
          <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">Specialty</label>
                <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                    value={topic}
                    onChange={(e) => {
                        setTopic(e.target.value);
                        if (e.target.value !== 'Custom Topic...') setCustomTopic('');
                    }}
                    className="w-full bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-700 dark:text-white focus:outline-none focus:border-cyan-500 appearance-none shadow-inner"
                >
                    {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                </div>
            </div>

            {topic === 'Custom Topic...' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative">
                    <input 
                        type="text"
                        placeholder="E.g. Docker Networking, Quantum Computing..."
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-cyan-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/20 shadow-lg transition-all"
                    />
                </motion.div>
            )}
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">Threat Level</label>
             <div className="flex space-x-2 bg-slate-100 dark:bg-black/40 p-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                      difficulty === diff 
                        ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-md border border-slate-200 dark:border-white/5' 
                        : 'text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-slate-200/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card hoverable className="p-8 h-full text-center flex flex-col items-center justify-center space-y-4 group cursor-pointer border-transparent hover:border-yellow-500/50" onClick={() => handleModeSelect('speed')}>
            <div className="w-20 h-20 bg-yellow-400/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Speed Run</h3>
            <p className="text-slate-500 dark:text-gray-400 text-sm">60 seconds total. AI assesses as many as possible.</p>
            </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card hoverable className="p-8 h-full text-center flex flex-col items-center justify-center space-y-4 group cursor-pointer border-transparent hover:border-red-500/50" onClick={() => handleModeSelect('survival')}>
            <div className="w-20 h-20 bg-red-400/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Survival</h3>
            <p className="text-slate-500 dark:text-gray-400 text-sm">3 Lives. The engine shuts down after 3 wrong answers.</p>
            </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card hoverable className="p-8 h-full text-center flex flex-col items-center justify-center space-y-4 group cursor-pointer border-transparent hover:border-purple-500/50" onClick={() => handleModeSelect('challenge')}>
            <div className="w-20 h-20 bg-purple-400/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Challenge</h3>
            <p className="text-slate-500 dark:text-gray-400 text-sm">15 Questions. Strict 15s timeframe per question.</p>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}
