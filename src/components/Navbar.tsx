import { Link, useLocation } from 'react-router-dom';
import { Home, Code, BrainCircuit, Palette, StickyNote, FileText, Mail, LogOut, User, Sun, Moon, Zap, Map } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/playground', label: 'Playground', icon: Code },
    { path: '/devquiz', label: 'DevQuiz', icon: BrainCircuit },
    { path: '/color-generator', label: 'Colors', icon: Palette },
    { path: '/notes', label: 'Notes', icon: StickyNote },
    { path: '/resume-builder', label: 'Resume', icon: FileText },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Zap },
    { path: '/roadmaps', label: 'Roadmaps', icon: Map },
    { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // If there is no user logged in, we shouldn't show the dashboard navigation items
    if (!user) {
        return (
            <nav className="print:hidden border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <div className="container mx-auto px-4 h-20 flex items-center">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-colors"></div>
                            <Code className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-2xl font-black neon-text hidden sm:block tracking-wider">DevVerse</span>
                    </Link>
                    
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-colors ml-auto group"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                        ) : (
                            <Moon className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-300" />
                        )}
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <nav className="glass-panel print:hidden sticky top-0 z-50 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="container mx-auto px-4 relative">
                <div className="flex items-center justify-between h-20 w-full max-w-full overflow-x-auto pb-2 md:pb-0 custom-scrollbar gap-4 lg:gap-8">
                    <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-colors"></div>
                            <Code className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-2xl font-black text-gradient-premium hidden xl:block tracking-tighter">DevVerse</span>
                    </Link>

                    <div className="flex space-x-2 flex-nowrap items-center flex-grow justify-start md:justify-center overflow-x-auto">
                        {navItems.map(({ path, label, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap relative group overflow-hidden ${isActive
                                        ? 'text-slate-900 dark:text-white bg-slate-200/50 dark:bg-white/5'
                                        : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 z-10 relative transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                                    <span className="text-sm font-bold tracking-wide hidden lg:block z-10 relative">{label}</span>
                                    {/* Animated bottom border glow */}
                                    <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}></div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-colors group"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            ) : (
                                <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                            )}
                        </button>
                        
                        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-surface/50 border border-slate-200 dark:border-white/10 transition-colors">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold font-display text-slate-700 dark:text-gray-300">{user.name.split(' ')[0]}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 px-3 py-2 rounded-xl text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-wide hidden sm:block">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
