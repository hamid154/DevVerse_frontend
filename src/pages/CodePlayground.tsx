import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Maximize2, Bot, Sparkles, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CodePlayground() {
    const [html, setHtml] = useState('<div class="premium-box">\n  <h1>DevVerse Space</h1>\n  <p>Ask AI to build something crazy here.</p>\n</div>');
    const [css, setCss] = useState('.premium-box {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: radial-gradient(circle at center, #1e1e40, #0a0a1a);\n  color: white;\n  font-family: system-ui, sans-serif;\n}\n\nh1 {\n  background: -webkit-linear-gradient(45deg, #00f2fe, #4facfe);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  font-size: 3rem;\n  margin-bottom: 0.5rem;\n}\n\np {\n  color: #a8b2d1;\n}');
    const [js, setJs] = useState('console.log("Welcome to DevVerse Playground!");');
    const [srcDoc, setSrcDoc] = useState('');
    
    // UI State
    const [activeTab, setActiveTab] = useState<'html'|'css'|'js'>('html');
    
    // AI State
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}<\/script>
          </body>
        </html>
      `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const handleAIGeneration = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);

        try {
            const fullPrompt = `You are a strict JSON generator. Your only purpose is to output valid JSON. The user wants you to generate HTML, CSS and JS for: "${prompt}".
            
            Strict JSON Format Required:
            {
                "html": "raw html here without wrapping in html/body tags",
                "css": "raw css here",
                "js": "raw js here"
            }
            
            RULES:
            1. Output raw JSON only. Do not wrap in markdown \`\`\`json blocks.
            2. Do not include any explanations.`;

            const response = await fetch("http://localhost:5000/ask-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: fullPrompt }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            let cleanJsonStr = data.text;
            if (cleanJsonStr.includes('\`\`\`')) {
                cleanJsonStr = cleanJsonStr.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
            }

            const generatedData = JSON.parse(cleanJsonStr);
            if (generatedData.html) setHtml(generatedData.html);
            if (generatedData.css) setCss(generatedData.css);
            if (generatedData.js) setJs(generatedData.js);
            setPrompt("");

        } catch (err) {
            console.error("AI Code Generation Error", err);
            alert("Matrix failed to interpret the prompt. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pt-4 px-4 pb-10 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-500 rounded-xl border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                        <Code className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Code <span className="neon-text">Playground</span></h1>
                        <p className="text-sm font-semibold text-slate-500 dark:text-gray-400">Where imagination meets execution.</p>
                    </div>
                </div>
            </div>

            {/* AI Generator Bar */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="bg-white/50 dark:bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-2 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500"></div>
                <div className="flex items-center px-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 pb-2 md:pb-0 h-full">
                    <Bot className="w-6 h-6 text-cyan-500 mr-2" />
                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200 uppercase tracking-wider">AI Architect</span>
                </div>
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g. Build a glassmorphism login form, Create a bouncing ball..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAIGeneration()}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white px-4 py-2 text-sm font-medium w-full placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none"
                    disabled={isGenerating}
                />
                <button 
                    onClick={handleAIGeneration}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(0,242,254,0.3)]"
                >
                    {isGenerating ? <Sparkles className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    {isGenerating ? 'Synthesizing...' : 'Generate Code'}
                </button>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6 h-[60vh] min-h-[500px]">
                {/* Editor Panel */}
                <Card className="flex-1 flex flex-col overflow-hidden bg-slate-900 border border-slate-700 dark:border-white/10 shadow-2xl relative">
                    {/* Tabs */}
                    <div className="flex bg-[#0d1117] border-b border-white/10">
                        <button 
                            onClick={() => setActiveTab('html')} 
                            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center transition-colors ${activeTab === 'html' ? 'bg-white/5 text-red-400 border-b-2 border-red-400' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                        >
                            <span className="w-2 h-2 rounded-full bg-red-400 mr-2 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span> HTML
                        </button>
                        <button 
                            onClick={() => setActiveTab('css')} 
                            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center transition-colors ${activeTab === 'css' ? 'bg-white/5 text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span> CSS
                        </button>
                        <button 
                            onClick={() => setActiveTab('js')} 
                            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center transition-colors ${activeTab === 'js' ? 'bg-white/5 text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                        >
                            <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span> JS
                        </button>
                    </div>
                    
                    {/* Text Area */}
                    <div className="flex-1 bg-[#1e1e1e] p-4 relative">
                        {isGenerating && (
                            <div className="absolute inset-0 bg-[#1e1e1e]/80 backdrop-blur-sm flex items-center justify-center z-10">
                                <Code className="w-12 h-12 text-cyan-500 animate-pulse" />
                            </div>
                        )}
                        {activeTab === 'html' && (
                            <textarea
                                value={html}
                                onChange={(e) => setHtml(e.target.value)}
                                className="w-full h-full bg-transparent text-[#e3e3e3] font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar"
                                spellCheck={false}
                            />
                        )}
                        {activeTab === 'css' && (
                            <textarea
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                                className="w-full h-full bg-transparent text-[#e3e3e3] font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar"
                                spellCheck={false}
                            />
                        )}
                        {activeTab === 'js' && (
                            <textarea
                                value={js}
                                onChange={(e) => setJs(e.target.value)}
                                className="w-full h-full bg-transparent text-[#e3e3e3] font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar"
                                spellCheck={false}
                            />
                        )}
                    </div>
                </Card>

                {/* Preview Panel */}
                <Card className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl relative group">
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md pointer-events-none z-10 flex items-center shadow-lg border border-white/10">
                        <Maximize2 className="w-3.5 h-3.5 mr-2" /> <span className="text-xs font-bold tracking-wider uppercase">Preview Console</span>
                    </div>
                    
                    {/* Fake Browser Chrome */}
                    <div className="w-full bg-slate-100 dark:bg-[#2d2d2d] h-10 flex items-center px-4 space-x-2 border-b border-slate-200 dark:border-white/5">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-1/2 max-w-sm h-5 bg-white dark:bg-black/20 rounded-full border border-slate-200 dark:border-white/5 flex items-center px-4">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">localhost:3000/sandbox</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 bg-white relative">
                        {isGenerating && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                                <p className="mt-4 text-sm font-bold text-slate-600 animate-pulse">Rendering Matrix...</p>
                            </div>
                        )}
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            className="w-full h-full border-0 absolute inset-0"
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
