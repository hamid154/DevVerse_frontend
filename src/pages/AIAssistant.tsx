import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Send, Sparkles, RotateCcw, Bot, Code2, Zap, TerminalSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askAI } from '../utils/ai';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

const shortcuts = [
  { icon: <Code2 className="w-5 h-5 text-cyan-400" />, label: 'Explain Code', prompt: 'Explain the following code snippet logically with examples.', desc: 'Break down complex logic' },
  { icon: <Zap className="w-5 h-5 text-purple-400" />, label: 'Fix Bugs', prompt: 'Find the bug in the following code and provide a corrected version.', desc: 'Identify errors instantly' },
  { icon: <TerminalSquare className="w-5 h-5 text-emerald-400" />, label: 'Generate React Component', prompt: 'Generate a complete, production-ready React component with Tailwind CSS for:', desc: 'Build UI blocks fast' },
];

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const apiKey = true; // Handled securely by the backend

  useEffect(() => {
    console.log('AIAssistant mounted', { apiKey });
    setIsReady(true);
    if (!apiKey) {
      setError('Missing Gemini API key (VITE_GEMINI_API_KEY). Please add .env and restart.');
    }
  }, [apiKey]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const isSendDisabled = useMemo(() => !input.trim() || loading, [input, loading]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-cyan-400 font-mono text-sm tracking-widest">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          INITIALIZING AI CORE...
        </motion.div>
      </div>
    );
  }

  if (error && !apiKey) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center p-8 bg-[#0a0a0f] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/20 rounded-full blur-[100px]"></div>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 bg-black/40 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl max-w-lg text-center shadow-[0_0_50px_rgba(239,68,68,0.15)]"
        >
          <RotateCcw className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-black mb-3 text-white tracking-tight">System Offline</h1>
          <p className="mb-4 text-red-200">{error}</p>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-left">
             <code className="text-xs text-slate-300 whitespace-pre-line">
                 1. Create a .env file in DevVerse_Tools{'\n'}
                 2. Add VITE_GEMINI_API_KEY=your_key{'\n'}
                 3. Restart the server
             </code>
          </div>
        </motion.div>
      </div>
    );
  }

  async function handleSend(e?: FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const aiText = await askAI(userMsg.text);
      const aiMsg: ChatMessage = { role: 'ai', text: aiText || 'No syntax received from AI core.' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('AIAssistant error:', err);
      setError(err?.message || 'Connection lost to AI Node');
      setMessages((prev) => [...prev, { role: 'ai', text: 'Error: Connection lost. Ensure your API limit is not exhausted.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[90vh] bg-slate-50 dark:bg-[#050508] text-slate-900 dark:text-white relative overflow-hidden flex flex-col font-sans">
      {/* Immersive Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col px-4 sm:px-6 py-6 pb-2">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between rounded-3xl border border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0f111a]/80 p-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-20"
        >
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Bot className="h-7 w-7" />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#0f111a]" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">NEXUS AI</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Advanced Developer Assistant</p>
            </div>
          </div>
        </motion.header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-[#0a0c10]/60 backdrop-blur-xl shadow-inner scroll-smooth custom-scrollbar relative">
          <div className="p-6 space-y-6 min-h-full flex flex-col justify-end">
            
            {/* Empty State / Shortcuts */}
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="my-auto mx-auto w-full max-w-3xl pt-10"
              >
                <div className="text-center mb-10">
                    <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
                    <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">How can I help you code?</h2>
                    <p className="text-slate-600 dark:text-slate-400">Select a specialized workflow or type your custom query below.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {shortcuts.map((item, idx) => (
                    <motion.button
                      key={item.label}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.1 } }}
                      onClick={() => setInput(item.prompt)}
                      className="flex flex-col text-left rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-5 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group shadow-sm"
                    >
                      <div className="mb-3 p-2 bg-slate-100 dark:bg-black/40 rounded-lg inline-block group-hover:bg-slate-200 dark:group-hover:bg-black/60 transition-colors">
                          {item.icon}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mb-1">{item.label}</span>
                      <span className="text-xs text-slate-500">{item.desc}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Chat Messages */}
            <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                        key={`${message.role}-${index}`}
                        className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-3 mt-1 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                        )}
                        
                        <div
                            className={`relative max-w-[85%] rounded-3xl p-5 text-[15px] leading-relaxed backdrop-blur-md ${
                                message.role === 'user'
                                ? 'bg-gradient-to-br from-primary to-blue-600 text-white rounded-tr-sm shadow-[0_10px_25px_rgba(59,130,246,0.2)]'
                                : 'bg-white dark:bg-[#151822]/90 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)]'
                            }`}
                        >
                            <div dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br/>') }} className="font-medium tracking-wide prose dark:prose-invert max-w-none prose-p:my-1 prose-pre:bg-slate-100 dark:prose-pre:bg-black/50 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-white/10 prose-pre:rounded-xl"></div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Loading/Typing State */}
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <Bot className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-white/5 bg-white dark:bg-[#151822]/90 px-5 py-4 backdrop-blur-lg">
                  <div className="flex gap-1.5">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-cyan-500"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-purple-500"></motion.div>
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Analyzing Context</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        </main>

        {/* Floating Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 z-20"
        >
            <form onSubmit={handleSend} className="relative group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-primary to-purple-600 opacity-20 blur-lg transition duration-500 group-hover:opacity-40"></div>
                <div className="relative flex items-end gap-3 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0f111a]/90 p-2 pl-6 backdrop-blur-2xl shadow-2xl">
                
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={apiKey ? 'Ask NEXUS something brilliant...' : 'Awaiting API Key...'}
                    className="max-h-32 min-h-[44px] w-full resize-none border-none bg-transparent py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-0 scrollbar-hide"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 5) : 1}
                    disabled={!apiKey || loading}
                />
                
                <div className="flex shrink-0 p-1">
                    <button
                        type="submit"
                        disabled={isSendDisabled || !apiKey}
                        className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0f111a] font-bold shadow-lg transition-all hover:bg-cyan-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 overflow-hidden"
                    >
                        {loading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                <Sparkles className="h-5 w-5 text-cyan-500" />
                            </motion.div>
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                        
                    </button>
                    </div>
                </div>
                <div className="text-center mt-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                    <span className="text-cyan-500/80">Shift + Enter</span> for new line • Responses are AI-generated
                </div>
            </form>
        </motion.div>

      </div>
      
      {/* Global override for scrollbar to make it sleek */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(6, 182, 212, 0.5);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  );
}
