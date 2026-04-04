import Card from '../Card';
import { Question } from '../../data/questions';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  isEvaluating: boolean;
  onSelect: (option: string) => void;
}

export default function QuestionCard({ 
  question, 
  selectedAnswer,
  isEvaluating,
  onSelect 
}: QuestionCardProps) {

  const getOptionClasses = (option: string) => {
    const baseClasses = "w-full text-left p-4 rounded-xl border font-medium outline-none ";
    
    if (!isEvaluating) {
      // Standard state
      return baseClasses + "transition-colors duration-200 bg-white/60 dark:bg-surface/60 border-slate-200 dark:border-white/10 hover:border-primary/50 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transform transition-transform hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]";
    }

    // Evaluating state
    if (option === question.correctAnswer) {
      return baseClasses + "transition-all duration-300 bg-green-500/20 border-green-500 text-green-700 dark:text-green-400 font-bold scale-[1.03] shadow-[0_0_20px_rgba(34,197,94,0.4)] z-10 animate-pulse";
    }
    if (selectedAnswer === option) {
      return baseClasses + "transition-all duration-300 bg-red-500/20 border-red-500 text-red-700 dark:text-red-400 animate-[shake_0.4s_ease-in-out_1]";
    }
    // Dim the unselected, incorrect options
    return baseClasses + "transition-all duration-300 bg-white/60 dark:bg-surface/60 border-slate-200 dark:border-white/10 text-slate-400 dark:text-gray-500 opacity-40";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 md:p-8 animate-fade-in relative z-20">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full capitalize">
          {question.category}
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-widest ${
            question.difficulty === 'hard' ? 'text-red-500 bg-red-500/10' :
            question.difficulty === 'medium' ? 'text-yellow-500 bg-yellow-500/10' :
            'text-green-500 bg-green-500/10'
        }`}>
          {question.difficulty}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white leading-snug">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            disabled={isEvaluating}
            className={getOptionClasses(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  );
}
