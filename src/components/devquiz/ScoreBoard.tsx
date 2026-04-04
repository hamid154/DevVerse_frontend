import { Flame, Heart, Clock, Trophy } from 'lucide-react';
import { GameMode } from './GameModeSelector';

interface Props {
  mode: GameMode;
  xp: number;
  streak: number;
  lives: number;
  timeLeft: number;
}

export default function ScoreBoard({ mode, xp, streak, lives, timeLeft }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-between items-center p-4 bg-white/80 dark:bg-surface/80 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md mb-8 shadow-sm">
      
      {/* Mode & XP */}
      <div className="flex items-center space-x-6">
        <div className="font-bold text-slate-700 dark:text-gray-300 capitalize flex items-center">
          <span className="text-primary mr-2">Mode:</span> {mode}
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{xp} <span className="text-sm font-medium text-slate-500 tracking-normal">XP</span></span>
        </div>
      </div>

      {/* Dynamic Stats based on Mode */}
      <div className="flex items-center space-x-6 mt-4 sm:mt-0">
        
        {/* Streak Analyzer */}
        <div className={`flex items-center space-x-1 ${streak >= 3 ? 'animate-pulse text-orange-500' : 'text-slate-400 dark:text-gray-500 transition-colors'}`}>
          <Flame className={`w-5 h-5 ${streak >= 3 ? 'text-orange-500' : ''}`} />
          <span className="font-bold">{streak}</span>
        </div>

        {/* Lives (Survival) */}
        {mode === 'survival' && (
          <div className="flex items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`w-5 h-5 transition-colors duration-300 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-200 dark:text-white/10 fill-slate-200 dark:fill-white/10'}`} />
            ))}
          </div>
        )}

        {/* Timer (Speed / Challenge) */}
        {(mode === 'speed' || mode === 'challenge') && (
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors duration-300 ${timeLeft <= 10 ? 'bg-red-500/10 text-red-500 animate-[pulse_1s_ease-in-out_infinite]' : 'bg-primary/10 text-primary'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-bold font-mono text-lg">{timeLeft}s</span>
          </div>
        )}

      </div>
    </div>
  );
}
