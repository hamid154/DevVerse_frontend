import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Sparkles, TerminalSquare, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/Input';
import Button from '../components/Button';
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

    // The route the user intended to access before being redirected to login
    const from = location.state?.from?.pathname || '/';

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            setError('Server connection failed. Please ensure the backend is running.');
            console.error(err);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-12 bg-[#05050A] overflow-hidden relative">
            {/* DEEP SPACE NEBULA EFFECTS */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="fixed inset-0 grid-background pointer-events-none opacity-20 z-0"></div>

            <main className="w-full max-w-6xl flex flex-col lg:flex-row bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 min-h-[750px] backdrop-blur-3xl transition-all">
                
                {/* LEFT SIDE: Login Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden bg-black/40">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="max-w-md w-full mx-auto"
                    >
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="text-4xl xl:text-5xl font-black mb-2 text-white tracking-tighter">
                                Sign In
                            </h1>
                            <p className="text-slate-500 font-medium tracking-wide flex items-center justify-center lg:justify-start gap-2 italic">
                                01 // Secure access to your workspace
                            </p>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            <AnimatePresence>
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center font-medium"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <motion.div whileTap={{ scale: 0.99 }}>
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="developer@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/80 dark:bg-black/40 border-slate-200 dark:border-white/5 py-3 focus:ring-primary/60 focus:border-primary/80 transition-all duration-300"
                                />
                            </motion.div>
                            
                            <motion.div whileTap={{ scale: 0.99 }} className="relative group/input">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Password</label>
                                    <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/60 shadow-inner transition-all duration-300"
                                    />
                                    <button 
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-primary transition-colors focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                                <Button type="submit" disabled={isLoggingIn} fullWidth className="group font-black text-lg py-4 bg-gradient-to-r from-primary to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white border-transparent shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 !rounded-xl overflow-hidden relative disabled:opacity-70">
                                    <span className="relative z-10 tracking-widest flex items-center justify-center">
                                        {isLoggingIn ? 'AUTHENTICATING...' : 'LOGIN'}
                                        {!isLoggingIn && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />}
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"></div>
                                </Button>
                            </motion.div>
                        </form>
                        
                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200 dark:border-white/10"></span>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white/40 dark:bg-[#0f111a] px-3 font-semibold text-slate-500 dark:text-gray-400 rounded-full">
                                    OR
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400 font-medium">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-extrabold ml-1 relative inline-block group">
                                Create Account
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary dark:bg-cyan-400 transition-all group-hover:w-full"></span>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: VISUAL PANEL */}
                <div className="hidden lg:flex w-1/2 bg-slate-900 dark:bg-black/60 p-12 xl:p-16 flex-col justify-center relative overflow-hidden border-l border-white/10">
                    {/* Animated Gradient Orbs */}
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/40 rounded-full blur-[80px]"
                    />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.4, 0.2],
                            rotate: [0, -90, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/30 rounded-full blur-[100px]"
                    />

                    {/* Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-lg mx-auto"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 mb-8 border border-white/10 backdrop-blur-md cursor-default shadow-lg"
                        >
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold tracking-wider text-cyan-100 uppercase">Interactive Playground</span>
                        </motion.div>
                        
                        <h2 className="text-4xl xl:text-7xl font-light text-white mb-2 leading-none tracking-[0.4em] font-accent uppercase">
                            Welcome
                        </h2>
                        <h3 className="text-xl xl:text-3xl font-black text-gradient-premium tracking-[0.2em] mb-8 font-display uppercase italic">
                            DEVVERSE TYPEFACE
                        </h3>
                        
                        <p className="text-lg xl:text-xl text-slate-300/80 mb-12 leading-relaxed font-medium">
                            Your futuristic developer ecosystem. Build, scale, and visualize the next generation of software with unbreakable security.
                        </p>

                        {/* Code Preview Floating Window */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                </div>
                                <div className="text-xs font-mono font-bold text-slate-400 flex items-center bg-white/5 px-3 py-1 rounded-md">
                                    <TerminalSquare className="w-3 h-3 mr-2" />
                                    auth.service.ts
                                </div>
                                <div className="w-10"></div> {/* Spacer for centering */}
                            </div>
                            <div className="p-6 font-mono text-sm xl:text-base leading-loose overflow-x-auto">
                                <div className="text-cyan-400">import <span className="text-white">{`{ AuthProvider }`}</span> from <span className="text-emerald-400">'@devverse/core'</span>;</div>
                                <div className="mt-4"><span className="text-purple-400">const</span> <span className="text-blue-400">initializeSession</span> = <span className="text-purple-400">async</span> () {`=>`} {`{`}</div>
                                <div className="pl-6 mt-2 border-l border-white/10 ml-2">
                                    <span className="text-purple-400">try</span> {`{`}
                                    <div className="pl-6">
                                        <span className="text-purple-400">await</span> <motion.span className="text-blue-400" animate={{ textShadow: ["0 0 0px #60a5fa", "0 0 10px #60a5fa", "0 0 0px #60a5fa"] }} transition={{ duration: 2, repeat: Infinity }}>Auth.connect()</motion.span>;<br/>
                                        <span className="text-white">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-400">'Secure Uplink Established'</span>);
                                    </div>
                                    {`}`} <span className="text-purple-400">catch</span> (err) {`{`}
                                    <div className="pl-6">
                                        <span className="text-white">console</span>.<span className="text-blue-400">error</span>(<span className="text-rose-400">'Connection Refused'</span>);
                                    </div>
                                    {`}`}
                                </div>
                                <div>{`};`}</div>
                                <div className="mt-2 text-slate-500 italic">// Awaiting input...</div>
                                <motion.div 
                                    animate={{ opacity: [0, 1, 0] }} 
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2.5 h-5 bg-primary inline-block mt-3 align-middle rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
