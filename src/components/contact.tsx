import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, User, MessageSquare, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
    const navigate = useNavigate();

    return (
        <section className="relative z-10 overflow-hidden bg-slate-50 dark:bg-[#050508] pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300" id="contact">
            {/* Immersive Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-20">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* LEFT COLUMN: Info & Branding */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-12"
                    >
                        <div>
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
                                Contact
                            </div>
                            <h2 className="text-4xl md:text-6xl font-accent tracking-tighter text-slate-900 dark:text-white mb-4">
                                LET'S <span className="text-gradient-premium">CONNECT.</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md font-medium">
                                Have a project in mind or want to collaborate? I'd love to hear from you.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {[
                                { icon: <Mail className="w-6 h-6" />, title: "Email", value: "haamidhussain0012@gmail.com", link: "mailto:haamidhussain0012@gmail.com", color: "text-cyan-400", bg: "bg-cyan-400/10" },
                                { icon: <Phone className="w-6 h-6" />, title: "Phone", value: "+91 84690 92398", link: "tel:+918469092398", color: "text-purple-400", bg: "bg-purple-400/10" },
                                { icon: <MapPin className="w-6 h-6" />, title: "Location", value: "Rajkot, Gujarat, India", color: "text-emerald-400", bg: "bg-emerald-400/10" },
                            ].map((item, idx) => (
                                <motion.div 
                                    key={item.title}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="group relative flex items-center p-5 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl transition-all hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mr-5 shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-slate-900 dark:text-slate-200 font-bold font-display">{item.value}</p>
                                    </div>
                                    {item.link && (
                                        <a href={item.link} className="text-slate-500 group-hover:text-cyan-500 transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 px-1">Follow Me</h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Github className="w-5 h-5" />, link: "https://github.com/hamid154", color: "hover:bg-slate-900 hover:text-white" },
                                    { icon: <Linkedin className="w-5 h-5" />, link: "https://www.linkedin.com/in/hamid-hussain-86946229a/", color: "hover:bg-[#0077b5] hover:text-white" },
                                    { icon: <Twitter className="w-5 h-5" />, link: "https://x.com/HamidHu92569849", color: "hover:bg-[#1DA1F2] hover:text-white" },
                                    { icon: <Instagram className="w-5 h-5" />, link: "#", color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-purple-600 hover:text-white" },
                                ].map((social, i) => (
                                    <motion.a 
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className={`w-12 h-12 rounded-xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 transition-all backdrop-blur-md ${social.color}`}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: The Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="mb-10 text-left">
                           <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 leading-tight font-display">
                                Let's Build<br /> 
                                <span className="text-gradient-premium">Something Amazing</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                                Fill out the form below and I'll get back to you soon.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <input 
                                        type="email" 
                                        placeholder="Your Email" 
                                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <textarea 
                                    rows={5} 
                                    placeholder="Your Message" 
                                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all resize-none"
                                ></textarea>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* INTEGRATED FOOTER */}
                <footer className="mt-32 pt-20 border-t border-slate-200 dark:border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="lg:col-span-2">
                             <span className="text-2xl font-black text-gradient-premium tracking-tighter mb-4 block">DevVerse</span>
                             <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
                                Nexus for the next generation. Learn, code, and deploy in one unified space.
                             </p>
                        </div>
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-bold mb-4 font-display">Resources</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li>Roadmaps</li>
                                <li>DevQuiz</li>
                                <li>Playground</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-bold mb-4 font-display">Connect</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li>LinkedIn</li>
                                <li>GitHub</li>
                                <li>Twitter</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 text-center">
                        <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">© 2024 DEVVERSE SYSTEMS INC.</p>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
