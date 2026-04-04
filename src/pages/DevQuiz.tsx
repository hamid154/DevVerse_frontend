import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import GameModeSelector, { GameMode } from '../components/devquiz/GameModeSelector';
import ScoreBoard from '../components/devquiz/ScoreBoard';
import ResultScreen from '../components/devquiz/ResultScreen';
import QuestionCard from '../components/devquiz/QuestionCard';
import { API_BASE_URL } from '../config';

import { Question } from '../data/questions';

export default function DevQuiz() {
  const navigate = useNavigate();
  
  // Game Configuration State
  const [mode, setMode] = useState<GameMode | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');

  // Core Mechanics State
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Stats
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // UI Flow State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // 1. Initial Selection Catch
  const handleConfiguration = async (selectedMode: GameMode, selectedTopic: string, selectedDifficulty: string) => {
    setMode(selectedMode);
    setTopic(selectedTopic);
    setDifficulty(selectedDifficulty);
    setIsGenerating(true);
    setGenerationError(null);

    // Call the AI Generation Pipeline
    await synthesizeQuestions(selectedMode, selectedTopic, selectedDifficulty);
  };

  // 2. The AI Generation Brain
  const synthesizeQuestions = async (targetMode: string, targetTopic: string, targetDifficulty: string) => {
    try {
        const questionCount = targetMode === 'challenge' ? 15 : 20;

        const prompt = `You are a strict JSON generator. Your only purpose is to output valid JSON. Generate a software engineering multiple-choice quiz about: "${targetTopic}".
        Difficulty requested: "${targetDifficulty}".
        Quantity: Exactly ${questionCount} questions.
        If mixed difficulty is requested, escalate from easy to hard.
        
        Strict JSON Format Required (Array of Objects):
        [
            {
                "question": "The question text?",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "correctAnswer": "Option 2",
                "difficulty": "medium",
                "explanation": "Brief reasoning why Option 2 is correct"
            }
        ]
        
        RULES:
        1. 'correctAnswer' MUST exactly match one of the string items in the 'options' array.
        2. 'options' must always have exactly 4 items.
        3. Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Output raw JSON only. Do not say "Here is the quiz".`;

        const response = await fetch(`${API_BASE_URL}/ask-ai`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to contact AI Engine");
        }

        // Clean any possible markdown hallucination from AI
        let cleanJsonStr = data.text;
        if (cleanJsonStr.includes('```')) {
            cleanJsonStr = cleanJsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        const generatedData = JSON.parse(cleanJsonStr);

        if (!Array.isArray(generatedData) || generatedData.length === 0) {
            throw new Error("AI returned invalid structure");
        }

        // Setup the game with the dynamic data!
        setQuizQuestions(generatedData);
        initializeGameRules(targetMode);
        
    } catch (err: any) {
        console.error("AI Generation Error", err);
        setGenerationError(err.message || "Synthesization Matrix Failed. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  // 3. Game Rule Instantiation
  const initializeGameRules = (selectedMode: string) => {
    setCurrentIndex(0);
    setXp(0);
    setStreak(0);
    setIsGameOver(false);
    setSelectedAnswer(null);
    setIsEvaluating(false);

    switch (selectedMode) {
      case 'speed':
        setTimeLeft(60); // 60s global timer
        setLives(3); // Reset lives internally
        break;
      case 'survival':
        setLives(3); // 3 lives total
        setTimeLeft(0); // No timer in survival
        break;
      case 'challenge':
        setTimeLeft(15); // 15s per-question timer
        break;
    }
  };

  // 4. Dynamic Timer Operation
  useEffect(() => {
    if (!mode || isGenerating || isGameOver || isEvaluating || mode === 'survival') return;
    if (quizQuestions.length === 0) return; // Prevent timer if no questions loaded

    if (timeLeft <= 0) {
      if (mode === 'speed') {
        setIsGameOver(true);
      } else if (mode === 'challenge') {
        // Automatically default empty timer to "Wrong" answer in challenge mode
        handleAnswerSelection(null); 
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, mode, isGameOver, isEvaluating, isGenerating, quizQuestions]);

  // 5. User Input Execution
  const handleAnswerSelection = (option: string | null) => {
    if (isEvaluating) return;
    
    setSelectedAnswer(option);
    setIsEvaluating(true);
    
    const currentQuestion = quizQuestions[currentIndex];
    const isCorrect = option === currentQuestion.correctAnswer;
    
    // Process Architecture Stats
    if (isCorrect) {
      // Base XP plus a streak combo multiplier
      let baseXP = 10;
      if (currentQuestion.difficulty === 'medium') baseXP = 20;
      if (currentQuestion.difficulty === 'hard') baseXP = 30;

      setXp(prev => prev + baseXP + (Math.floor(streak / 3) * 5));
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
      if (mode === 'survival') {
        setLives(prev => prev - 1);
      }
    }

    setTimeout(() => {
      // Evaluate Game Over mechanics
      if (mode === 'survival' && lives <= 1 && !isCorrect) {
        setIsGameOver(true);
        return;
      }

      // Automatically complete game if pool is empty
      if (currentIndex + 1 < quizQuestions.length) {
        setCurrentIndex(prev => prev + 1);
        if (mode === 'challenge') setTimeLeft(15); // Reset per-question timer
        setSelectedAnswer(null);
        setIsEvaluating(false);
      } else {
        setIsGameOver(true); // AI Pool exhausted
      }
    }, 1500); // 1.5s visual freeze to read the explanation/correct color
  };

  // UI View Router: Generation Engine Exception
  if (isGenerating) {
      return (
          <div className="flex-grow flex items-center justify-center p-4 min-h-[80vh]">
              <div className="max-w-md w-full text-center space-y-6 animate-fade-in relative z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                  
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto rounded-full border-b-2 border-r-2 border-cyan-500 flex items-center justify-center bg-white/5 backdrop-blur-sm"
                  >
                      <Bot className="w-10 h-10 text-cyan-400" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Synthesizing Challenge...</h2>
                  <p className="text-slate-500 dark:text-gray-400 font-medium">
                      The AI is currently inventing unique <span className="text-cyan-500 font-bold">{difficulty}</span> questions targeting <span className="text-purple-500 font-bold">{topic}</span>.
                  </p>

                  <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1 mt-8 overflow-hidden">
                      <motion.div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                      />
                  </div>
              </div>
          </div>
      );
  }

  // UI View Router: Generation Failure
  if (generationError) {
      return (
          <div className="flex-grow flex items-center justify-center p-4 min-h-[80vh]">
              <div className="max-w-md w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-8 rounded-3xl text-center space-y-6 shadow-2xl animate-fade-in">
                  <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">AI Matrix Failure</h2>
                  <p className="text-sm text-slate-500 dark:text-gray-400">{generationError}</p>
                  <button 
                      onClick={() => { setMode(null); setGenerationError(null); }}
                      className="px-6 py-3 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-colors duration-300"
                  >
                      Configure New Rules
                  </button>
              </div>
          </div>
      );
  }

  // UI View Router: Initial Landing Selection
  if (!mode || quizQuestions.length === 0) {
    return <GameModeSelector onSelectMode={handleConfiguration} />;
  }

  // UI View Router: Completion Screen
  if (isGameOver) {
    return (
      <ResultScreen 
        xp={xp} 
        mode={mode} 
        onRestart={() => { setMode(null); setQuizQuestions([]); }} 
        onHome={() => navigate('/')} 
      />
    );
  }

  // UI View Router: Live Combat Engine sequence
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in relative z-10 p-4 lg:p-0 pt-8">
      <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 mr-2" />
              <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{topic}</span>
          </div>
          <span className="text-xs font-black text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-md">{difficulty.toUpperCase()}</span>
      </div>

      <ScoreBoard 
        mode={mode}
        xp={xp}
        streak={streak}
        lives={lives}
        timeLeft={timeLeft}
      />

      <QuestionCard 
        question={quizQuestions[currentIndex]}
        selectedAnswer={selectedAnswer}
        isEvaluating={isEvaluating}
        onSelect={handleAnswerSelection}
      />
    </div>
  );
}
