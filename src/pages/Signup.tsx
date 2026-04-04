import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Sparkles, TerminalSquare, ShieldCheck, Mail, ArrowLeft, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    // Shared State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Step 1: Signup State
    const [showPassword, setShowPassword] = useState(false);
    const [isSending, setIsSending] = useState(false);

    // Step 2: OTP Verification State
    const [step, setStep] = useState<'signup' | 'otp'>('signup');
    const [otpCode, setOtpCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const otpInputRef = useRef<HTMLInputElement>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Focus OTP input securely on mount
    useEffect(() => {
        if (step === 'otp' && otpInputRef.current) {
            otpInputRef.current.focus();
        }
    }, [step]);

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        setIsSending(true);

        try {
            // Initiate the OTP dispatch instead of blind database writing
            const response = await fetch("http://localhost:5000/send-signup-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (response.ok && data.message === "OTP_SENT") {
                // Pre-verification successful, wait for OTP
                setStep('otp');
            } else {
                setError(data.error || 'Failed to dispatch verification email');
            }
        } catch (err) {
            console.error('Registration dispatch error:', err);
            setError('Server connection failed. Is the backend running?');
        } finally {
            setIsSending(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (otpCode.length !== 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        setError('');
        setIsVerifying(true);

        try {
            const response = await fetch("http://localhost:5000/verify-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, otp: otpCode }),
            });
            
            const data = await response.json();

            if (response.ok && data.message === "User registered successfully") {
                login({ name, email });
                navigate('/');
            } else {
                setError(data.message || data.error || 'Invalid verification code');
            }
        } catch (err) {
            setError('Server connection failed.');
            console.error(err);
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4 lg:p-8 bg-slate-50 dark:bg-transparent overflow-hidden relative">
            {/* Background Atmosphere Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <main className="w-full max-w-6xl flex flex-col lg:flex-row-reverse bg-white/40 dark:bg-[#0f111a]/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative z-10 min-h-[600px] xl:min-h-[700px]">
                
                {/* INTERACTIVE SIDE: SIGNUP FORMS */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        
                        {/* ------------------------------------- */}
                        {/* STEP 1: INITIAL SIGNUP VIEW           */}
                        {/* ------------------------------------- */}
                        {step === 'signup' && (
                            <motion.div 
                                key="signup-form"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="max-w-md w-full mx-auto"
                            >
                                <div className="mb-10 text-center lg:text-left">
                                    <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white tracking-tight flex items-center justify-center lg:justify-start gap-3">
                                        Join DevVerse
                                    </h1>
                                    <p className="text-slate-600 dark:text-gray-400 font-medium tracking-wide flex items-center justify-center lg:justify-start gap-2">
                                        <UserPlus className="w-4 h-4 text-emerald-500" />
                                        Create your integrated developer account
                                    </p>
                                </div>

                                <form onSubmit={handleSignupSubmit} className="space-y-5">
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
                                            label="Full Name"
                                            type="text"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="bg-white/80 dark:bg-black/40 border-slate-200 dark:border-white/5 py-3 focus:ring-primary/60 focus:border-primary/80 transition-all duration-300"
                                        />
                                    </motion.div>
                                    
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
                                        <Button type="submit" disabled={isSending} fullWidth className="group font-black text-lg py-4 bg-gradient-to-r from-primary to-emerald-500 hover:from-blue-600 hover:to-emerald-400 text-white border-transparent shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 !rounded-xl overflow-hidden relative disabled:opacity-70">
                                            <span className="relative z-10 tracking-widest flex items-center justify-center">
                                                {isSending ? 'SENDING CODE...' : 'CREATE ACCOUNT'}
                                                {!isSending && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />}
                                            </span>
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"></div>
                                        </Button>
                                    </motion.div>
                                </form>
                                
                                <div className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400 font-medium">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-extrabold ml-1 relative inline-block group">
                                        Sign In
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary dark:bg-cyan-400 transition-all group-hover:w-full"></span>
                                    </Link>
                                </div>
                            </motion.div>
                        )}


                        {/* ------------------------------------- */}
                        {/* STEP 2: EMAIL OTP VERIFICATION VIEW   */}
                        {/* ------------------------------------- */}
                        {step === 'otp' && (
                            <motion.div 
                                key="otp-form"
                                initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="max-w-md w-full mx-auto"
                            >
                                <button 
                                    onClick={() => setStep('signup')}
                                    className="flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-6 group"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                                    Edit Registration Info
                                </button>

                                <div className="mb-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">
                                        Verify Email
                                    </h1>
                                    <p className="text-slate-600 dark:text-gray-400 font-medium tracking-wide mt-3 text-sm">
                                        We sent a 6-digit security pin to <br />
                                        <span className="text-primary font-bold">{email}</span>
                                    </p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-2 block">Security Code</label>
                                        <input
                                            ref={otpInputRef}
                                            type="text"
                                            maxLength={6}
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} // strictly strip non-numbers
                                            placeholder="------"
                                            required
                                            className="w-full bg-slate-100 dark:bg-black/60 border-2 border-slate-200 dark:border-white/10 rounded-xl px-4 py-4 text-center text-4xl font-mono font-black text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-gray-700 tracking-[0.5em] focus:outline-none focus:border-emerald-500 focus:ring-0 shadow-inner transition-colors duration-300"
                                        />
                                    </div>
                                    
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                                        <Button type="submit" disabled={isVerifying || otpCode.length < 6} fullWidth className="group font-black text-xl py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white border-transparent shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 !rounded-xl disabled:opacity-50">
                                            {isVerifying ? 'VERIFYING...' : 'COMPLETE REGISTRATION'}
                                        </Button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* VISUAL PANEL */}
                <div className="hidden lg:flex w-1/2 bg-slate-900 dark:bg-black/60 p-12 xl:p-16 flex-col justify-center relative overflow-hidden border-r border-white/10">
                    {/* Animated Gradient Orbs */}
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-500/30 rounded-full blur-[80px]"
                    />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.4, 0.2],
                            rotate: [0, -90, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/30 rounded-full blur-[100px]"
                    />

                    {/* Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-lg mx-auto"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 mb-8 border border-white/10 backdrop-blur-md cursor-default shadow-lg"
                        >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold tracking-wider text-emerald-100 uppercase">Enterprise Verification</span>
                        </motion.div>
                        
                        <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                            Start Building With <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary to-cyan-500 neon-text">Absolute Security</span>
                        </h2>
                        
                        <p className="text-lg xl:text-xl text-slate-300/80 mb-12 leading-relaxed font-medium">
                            We deploy strict pre-registration email verification to protect our ecosystem from bots and guarantee your data sovereignty.
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
                                    security.module.ts
                                </div>
                                <div className="w-10"></div> {/* Spacer for centering */}
                            </div>
                            <div className="p-6 font-mono text-sm xl:text-base leading-loose overflow-x-auto">
                                <div className="mt-2"><span className="text-purple-400">const</span> <span className="text-blue-400">verifyIdentity</span> = <span className="text-purple-400">async</span> (email: <span className="text-cyan-400">string</span>) {`=>`} {`{`}</div>
                                <div className="pl-6 mt-2 border-l border-white/10 ml-2">
                                    <span className="text-purple-400">try</span> {`{`}
                                    <div className="pl-6">
                                        <span className="text-purple-400">await</span> <motion.span className="text-emerald-400" animate={{ textShadow: ["0 0 0px #10b981", "0 0 10px #10b981", "0 0 0px #10b981"] }} transition={{ duration: 2, repeat: Infinity }}>SMTP.dispatch(email)</motion.span>;<br/>
                                        <span className="text-white">console</span>.<span className="text-blue-400">log</span>(<span className="text-cyan-400">'Awaiting Challenge Response'</span>);
                                    </div>
                                    {`}`} <span className="text-purple-400">catch</span> (err) {`{`}
                                    <div className="pl-6">
                                        <span className="text-white">console</span>.<span className="text-blue-400">error</span>(<span className="text-rose-400">'Firewall Blocked Creation'</span>);
                                    </div>
                                    {`}`}
                                </div>
                                <div>{`};`}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
