import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section className="min-h-screen bg-black text-white px-6 py-20 overflow-hidden relative">
            
            {/* STUDIO VISUAL - CHROME ABSTRACT */}
            <div className="absolute top-0 right-0 w-full h-[50vh] md:h-[70vh] opacity-60 md:opacity-80 pointer-events-none">
                <img 
                    src="/C:/Users/sonu8/.gemini/antigravity/brain/862ad19b-71aa-4bc6-99e7-788d1884afba/contact_abstract_chrome_1776111518628.png" 
                    alt="Creative Studio Visual" 
                    className="w-full h-full object-contain md:object-cover mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* STUDIO BRANDING HEADER */}
                <header className="mb-24 pt-20">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] tracking-[0.5em] font-black text-slate-500 uppercase mb-4"
                    >
                        Nexus Connect / 2024
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-9xl font-accent tracking-tighter leading-none mb-12"
                    >
                        LET'S BUILD <br/>
                        <span className="text-gradient-premium">THE BEYOND.</span>
                    </motion.h1>
                    
                    <div className="h-[1px] w-full bg-white/10"></div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* INFO COLUMN */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-4">Availability</h3>
                                <p className="text-xl font-medium">Open for Elite <br/> Partnerships & Dev</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-4">Social uplink</h3>
                                <div className="flex gap-4">
                                    <Github className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" />
                                    <Linkedin className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" />
                                    <Twitter className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
                            <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-6">Direct Channels</h3>
                            <div className="space-y-6">
                                <a href="mailto:nexus@devverse.ai" className="flex items-center gap-4 text-lg hover:text-cyan-400 transition-colors group">
                                    <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyan-500/10"><Mail className="w-5 h-5" /></div>
                                    uplink@devverse.space
                                </a>
                                <div className="flex items-center gap-4 text-lg">
                                    <div className="p-3 bg-white/5 rounded-full"><MapPin className="w-5 h-5" /></div>
                                    Global / Distributed
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MINIMALIST FORM */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase">Brief Input</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="IDENTITY" className="w-full bg-stone-900/50 border-b border-white/20 px-4 py-3 focus:border-cyan-500 outline-none transition-colors" />
                                <input type="email" placeholder="EMAIL" className="w-full bg-stone-900/50 border-b border-white/20 px-4 py-3 focus:border-cyan-500 outline-none transition-colors" />
                            </div>
                            <textarea rows={4} placeholder="THE VISION..." className="w-full bg-stone-900/50 border-b border-white/20 px-4 py-3 focus:border-cyan-500 outline-none transition-colors resize-none"></textarea>
                            
                            <button className="group flex items-center gap-4 bg-white text-black px-10 py-4 rounded-full font-black tracking-widest hover:bg-cyan-400 transition-all duration-300">
                                INITIALIZE UPLINK
                                <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>

                <footer className="mt-40 border-t border-white/10 pt-10 text-center">
                    <p className="text-slate-500 text-xs tracking-[0.3em] font-medium">© 2024 DEVVERSE ECOSYSTEM / ALL RIGHTS RESERVED.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
