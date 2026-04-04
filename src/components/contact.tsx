import { Sparkles, ArrowRight, Github, Twitter, Linkedin, Terminal, Layers, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Contact = () => {
    return (
        <section className="relative z-10 overflow-hidden bg-slate-50 dark:bg-[#06080e] pt-24" id="contact">
            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            
            {/* Main CTA Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-24">
                
                {/* Massive Animated CTA Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 dark:bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse"></div>

                <div className="text-center max-w-4xl mx-auto mb-12 animate-slide-up">
                    <div className="inline-flex items-center space-x-2 bg-white/5 dark:bg-white/5 rounded-full px-4 py-2 mb-8 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs font-bold tracking-wider text-slate-600 dark:text-cyan-100 uppercase">Scale Your Workflow</span>
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                        Ready to Build<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 neon-text pb-2">
                            The Future?
                        </span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                        Join developers worldwide using DevVerse to write, test, and deploy software at lightspeed. Your ultimate workspace awaits.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link to="/signup" className="w-full sm:w-auto">
                            <Button 
                                variant="primary" 
                                className="w-full sm:w-auto py-5 px-10 text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    INITIALIZE WORKSPACE <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                        <a href="mailto:haamidhussain0012@gmail.com" className="w-full sm:w-auto">
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto py-5 px-8 text-xl font-bold rounded-2xl"
                            >
                                Contact Engineering
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Micro-Features Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-slate-200 dark:border-white/5 mt-16 max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500"><Terminal className="w-6 h-6"/></div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Instant Sandbox</h4>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">Write code with zero setup required.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><Cpu className="w-6 h-6"/></div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">AI Orchestration</h4>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">DeepSeek integrated deeply into your flow.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Layers className="w-6 h-6"/></div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Absolute Security</h4>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">2FA Enforced Email Validation on entry.</p>
                    </div>
                </div>
            </div>

            {/* Mega Footer Section */}
            <footer className="bg-slate-100 dark:bg-[#0a0c12] border-t border-slate-200 dark:border-white/5 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
                        
                        {/* Brand Column */}
                        <div className="col-span-2 lg:col-span-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center mb-6">
                                DevVerse<span className="text-primary ml-1">.</span>
                            </span>
                            <p className="text-slate-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
                                Architecture for the next generation of engineers. DevVerse is your unified platform for learning, coding, and deploying.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://github.com/hamid154" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/hamid-hussain-86946229a/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:bg-[#0077b5] dark:hover:bg-[#0077b5]/20 hover:text-white dark:hover:text-[#0077b5] transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://x.com/HamidHu92569849" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:bg-black dark:hover:bg-white/10 hover:text-white transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Product</h4>
                            <ul className="space-y-4">
                                <li><Link to="/roadmap" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">AI Roadmap</Link></li>
                                <li><Link to="/devquiz" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">DevQuiz Arcade</Link></li>
                                <li><Link to="/resume" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Resume Builder</Link></li>
                                <li><Link to="/playground" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Code Playground</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Resources</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">API Reference</a></li>
                                <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Community</a></li>
                                <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Legal</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                                <li><a href="mailto:haamidhussain0012@gmail.com" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Contact Us</a></li>
                            </ul>
                        </div>

                    </div>
                    
                    {/* Tiny Copyright Strip */}
                    <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400 dark:text-gray-500">
                            © {new Date().getFullYear()} DevVerse. Built by Hamid Hussain. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-slate-400 dark:text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>All Systems Operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
