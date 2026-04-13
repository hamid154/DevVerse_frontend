import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, Lock, Github, Chrome, TerminalSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user, data.token);
                navigate(from, { replace: true });
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('System connection failed. Uplink unreachable.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex items-center justify-center p-4 lg:p-0">
            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 grid-background opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

            <main className="w-full max-w-7xl flex flex-col lg:flex-row bg-[#0D121F]/80 backdrop-blur-3xl border border-white/5 lg:rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 lg:min-h-[850px]">
                
                {/* LEFT: LOGIN FORM */}
                <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center border-r border-white/5">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md w-full mx-auto space-y-10"
                    >
                        <header className="space-y-3 text-center lg:text-left">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Access Dashboard</h1>
                            <p className="text-slate-500 text-lg font-medium">Continue your engineering journey.</p>
                        </header>

                        {/* SOCIAL AUTH */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-sm">
                                <Chrome className="w-4 h-4 text-cyan-400" /> Google
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-sm">
                                <Github className="w-4 h-4" /> GitHub
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="w-full h-[1px] bg-white/5"></div>
                            <span className="absolute bg-[#0D121F] px-4 text-[10px] font-black tracking-widest text-slate-600 uppercase">OR</span>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-bold text-center">
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label className="text-xs font-black tracking-widest text-slate-500 uppercase ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="dev@devverse.ai" 
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all text-white placeholder-slate-600"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-black tracking-widest text-slate-500 uppercase">Password</label>
                                    <Link to="/forgot" className="text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors">Recovery Key?</Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all text-white placeholder-slate-600"
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-4 flex items-center text-slate-600 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoggingIn}
                                className="w-full group bg-gradient-to-r from-cyan-600 to-blue-700 py-4 rounded-xl font-black tracking-widest uppercase text-white shadow-[0_20px_40px_-15px_rgba(8,145,178,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(8,145,178,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isLoggingIn ? 'Establishing Uplink...' : 'Initialize Session'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <footer className="text-center pt-4">
                            <p className="text-slate-500 font-medium">
                                New to the ecosystem? <Link to="/signup" className="text-white hover:text-cyan-400 font-bold ml-1 transition-colors">Create Identity</Link>
                            </p>
                        </footer>
                    </motion.div>
                </div>

                {/* RIGHT: MINIMAL VISUAL PANEL */}
                <div className="hidden lg:flex w-1/2 bg-[#080B14] p-20 flex-col justify-center relative overflow-hidden">
                    {/* ABSTRACT GLOWS */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none"></div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10"
                    >
                        <div className="space-y-1">
                            <span className="text-cyan-500 font-black tracking-[0.6em] text-[10px] uppercase">Nexus Phase // 04</span>
                            <h2 className="text-6xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                                DEPLOY <br/>
                                <span className="text-gradient-premium">BEYOND.</span>
                            </h2>
                        </div>
                        
                        <p className="mt-12 text-slate-400 text-lg xl:text-xl font-medium max-w-sm leading-relaxed">
                            The unified interface for modern product engineers.
                        </p>

                        <div className="mt-20 p-6 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-sm leading-relaxed relative overflow-hidden group">
                           <div className="flex items-center gap-2 mb-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
                              <div className="ml-auto flex items-center gap-2 text-[10px] text-slate-600 font-black">
                                 <TerminalSquare className="w-3 h-3" />
                                 SESSION_LOG
                              </div>
                           </div>
                           <div className="space-y-1 text-slate-500">
                             <div><span className="text-cyan-500">nexus</span> establish --identity {`<user>`}</div>
                             <div className="text-emerald-500/60 transition-opacity group-hover:opacity-100 opacity-60">Status: Establishing secure connection...</div>
                             <div className="text-emerald-500/60 transition-opacity group-hover:opacity-100 opacity-60">Handshake: 256-bit AES Encryption [OK]</div>
                             <div className="animate-pulse">_</div>
                           </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
