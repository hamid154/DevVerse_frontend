import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Globe, Database, Wifi } from 'lucide-react';

const DevHUD = () => {
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
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none hidden lg:block">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel p-4 rounded-xl border border-white/10 dark:bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col gap-3 font-mono text-[10px] tracking-tight uppercase"
      >
        <div className="flex items-center gap-3 text-cyan-400">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="font-black">Nexus Systems Operational</span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 opacity-60">
          <div className="flex items-center gap-2">
            <Cpu className="w-2.5 h-2.5" />
            <span>Node_v20.1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-2.5 h-2.5 text-emerald-400" />
            <span>US_WEST_1</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-2.5 h-2.5 text-purple-400" />
            <span>Gemini_1.5_Flash</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-2.5 h-2.5 text-orange-400" />
            <span>{latency}ms Latency</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-500">
          <span>{time}</span>
          <span className="text-cyan-500/50">Mem: {memory}GB</span>
        </div>
      </motion.div>
    </div>
  );
};

export default DevHUD;
