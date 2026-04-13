import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code, BrainCircuit, Palette, StickyNote, FileText, Mail, LogOut, User, Sun, Moon, Zap, Map, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/playground', label: 'Playground', icon: Code },
    { path: '/devquiz', label: 'DevQuiz', icon: BrainCircuit },
    { path: '/roadmaps', label: 'Roadmaps', icon: Map },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Zap },
    { path: '/resume-builder', label: 'Resume', icon: FileText },
    { path: '/notes', label: 'Notes', icon: StickyNote },
    { path: '/color-generator', label: 'Colors', icon: Palette },
    { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // If there is no user logged in
    if (!user) {
        return (
            <nav className="print:hidden border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#050508]/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <Code className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-2xl font-black text-gradient-premium tracking-tighter">DevVerse</span>
                    </Link>
                    <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5">
                        {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <nav className="glass-panel print:hidden sticky top-0 z-50 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="container mx-auto px-4 relative">
                <div className="flex items-center justify-between h-20">
                    
                    {/* LOGO */}
                    <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group relative z-[60]">
                        <Code className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-2xl font-black text-gradient-premium tracking-tighter hidden sm:block">DevVerse</span>
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex space-x-1 items-center bg-white/5 p-1 rounded-2xl border border-white/5">
                        {navItems.map(({ path, label, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 relative group ${isActive
                                        ? 'text-white bg-white/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
                                    <span className="text-sm font-bold tracking-tight">{label}</span>
                                    {isActive && (
                                        <motion.div layoutId="nav-active" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center space-x-3 relative z-[60]">
                        <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 lg:flex hidden">
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        
                        <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-slate-300">{user.name.split(' ')[0]}</span>
                        </div>

                        {/* MOBILE MENU TOGGLE */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <button onClick={logout} className="p-2.5 rounded-xl bg-white/5 text-rose-500 border border-white/10 hover:bg-rose-500/10 hidden lg:flex">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE SLIDE-OUT MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[50] lg:hidden"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0B0F19] z-[55] lg:hidden shadow-2xl border-l border-white/10 flex flex-col p-8"
                        >
                            <div className="flex items-center justify-between mb-10 pt-4">
                               <span className="text-xs font-black tracking-widest text-slate-500 uppercase">Navigation</span>
                               <button onClick={toggleTheme} className="p-2 rounded-lg bg-white/5 text-slate-400">
                                   {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                               </button>
                            </div>

                            <div className="space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                                {navItems.map(({ path, label, icon: Icon }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center space-x-4 p-4 rounded-2xl border transition-all ${location.pathname === path 
                                            ? 'bg-primary/20 border-primary/40 text-white' 
                                            : 'bg-white/5 border-white/5 text-slate-400'}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-bold tracking-wide">{label}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <button 
                                    onClick={logout}
                                    className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout System</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
