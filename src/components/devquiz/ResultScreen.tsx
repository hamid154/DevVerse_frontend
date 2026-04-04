import Card from '../Card';
import Button from '../Button';
import { GameMode } from './GameModeSelector';
import { Trophy, RotateCcw, Gamepad2 } from 'lucide-react';

interface Props {
  xp: number;
  mode: GameMode;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultScreen({ xp, mode, onRestart, onHome }: Props) {
  const getRank = () => {
    if (xp >= 500) return "Dev God 🚀";
    if (xp >= 300) return "Senior Engineer 💻";
    if (xp >= 150) return "Mid-Level Dev 🛠️";
    if (xp >= 50) return "Junior Engineer 🌱";
    return "Beginner 🤔";
  };

  return (
    <div className="max-w-xl mx-auto p-4 md:p-8 text-center animate-fade-in relative z-20">
      <Card className="p-10">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-[bounce_2s_infinite]">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h2 className="text-4xl font-black mb-2 text-slate-900 dark:text-white capitalize">
          {mode} Mode Complete!
        </h2>
        <div className="text-6xl font-black text-primary my-8 tracking-tighter">
          {xp} <span className="text-2xl text-slate-500 tracking-normal">XP</span>
        </div>
        <p className="text-2xl font-bold text-slate-700 dark:text-gray-300 mb-8">
          Rank: <span className="text-primary">{getRank()}</span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <Button onClick={onRestart} className="flex items-center" variant="primary">
            <RotateCcw className="w-5 h-5 mr-2" /> Play Again
          </Button>
          <Button variant="secondary" onClick={onHome} className="flex items-center">
            <Gamepad2 className="w-5 h-5 mr-2" /> Main Menu
          </Button>
        </div>
      </Card>
    </div>
  );
}
