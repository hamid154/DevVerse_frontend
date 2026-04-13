import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Globe, Database, Wifi, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

const DevHUD = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [latency, setLatency] = useState(24);
  const [memory, setMemory] = useState(4.2);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (45 - 18) + 18));
      setMemory(Number((Math.random() * (4.8 - 4.1) + 4.1).toFixed(1)));
      setTime(new Date().toLocaleTimeString());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] hidden lg:block pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-xl text-cyan-400 hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
          >
            <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          </motion.button>
        ) : (
          <motion.div 
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel p-4 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 font-mono text-[10px] tracking-tight uppercase min-w-[220px]"
          >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-cyan-400">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span className="font-black">Nexus Active</span>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                >
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-y-2.5 opacity-80 pt-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                    <Cpu className="w-3 h-3" />
                    <span>Runtime</span>
                </div>
                <span className="text-white font-bold">Node_v20.1</span>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                    <Database className="w-3 h-3" />
                    <span>Neural_P</span>
                </div>
                <span className="text-purple-400 font-bold">Gemini_Flash</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                    <Wifi className="w-3 h-3" />
                    <span>Uplink</span>
                </div>
                <span className="text-emerald-400 font-bold">{latency}ms</span>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-white/10 flex justify-between items-center text-[9px] text-slate-500">
              <div className="flex flex-col">
                <span>{time}</span>
                <span className="text-cyan-500/50">Mem_Load: {memory}GB</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                LIVE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevHUD;
