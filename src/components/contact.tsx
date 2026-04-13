import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, User, MessageSquare, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
    const navigate = useNavigate();

    return (
        <section className="relative z-10 overflow-hidden bg-[#050508] pt-32 pb-20 px-4 sm:px-6 lg:px-8" id="contact">
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
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
                                Contact
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Connect</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
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
                                    className="group relative flex items-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all hover:bg-white/[0.08] hover:border-white/20"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mr-5 shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-slate-200 font-medium">{item.value}</p>
                                    </div>
                                    {item.link && (
                                        <a href={item.link} className="text-slate-500 group-hover:text-white transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Follow Me</h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Github className="w-5 h-5" />, link: "https://github.com/hamid154", color: "hover:bg-white hover:text-black" },
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
                                        className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all backdrop-blur-md ${social.color}`}
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
                        <div className="mb-10 text-left lg:text-left">
                           <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-tight">
                                Let's Build<br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                                    Something Amazing
                                </span>
                            </h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-8"></div>
                            <p className="text-slate-400 text-lg">
                                Fill out the form below and I'll get back to you as soon as possible.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Your Name" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all backdrop-blur-xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="email" 
                                            placeholder="Your Email" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all backdrop-blur-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <div className="relative">
                                    <div className="absolute top-4 left-4 flex items-start pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <textarea 
                                        rows={6} 
                                        placeholder="Your Message" 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all backdrop-blur-xl resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-[1px] rounded-2xl group transition-all"
                            >
                                <div className="w-full h-full bg-[#050508]/80 group-hover:bg-transparent transition-colors rounded-2xl flex items-center justify-center py-5 gap-3">
                                    <Send className="w-5 h-5 text-white" />
                                    <span className="text-lg font-bold text-white tracking-widest uppercase">Send Message</span>
                                </div>
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>

            {/* INTEGRATED FOOTER */}
            <footer className="mt-32 pt-20 border-t border-white/5 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-2">
                        <span className="text-2xl font-black text-white tracking-tighter flex items-center mb-6">
                            DevVerse<span className="text-cyan-500 ml-1">.</span>
                        </span>
                        <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                            Architecture for the next generation of engineers. DevVerse is your unified platform for learning, coding, and deploying.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/roadmap" className="text-slate-500 hover:text-cyan-400 transition-colors">AI Roadmap</Link></li>
                            <li><Link to="/devquiz" className="text-slate-500 hover:text-cyan-400 transition-colors">DevQuiz Arcade</Link></li>
                            <li><Link to="/resume" className="text-slate-500 hover:text-cyan-400 transition-colors">Resume Builder</Link></li>
                            <li><Link to="/playground" className="text-slate-500 hover:text-cyan-400 transition-colors">Code Playground</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><button className="text-slate-500 hover:text-cyan-400 transition-colors">Privacy Policy</button></li>
                            <li><button className="text-slate-500 hover:text-cyan-400 transition-colors">Terms of Service</button></li>
                            <li><a href="mailto:haamidhussain0012@gmail.com" className="text-slate-500 hover:text-cyan-400 transition-colors">Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                    <p className="text-xs text-slate-500 font-medium tracking-wider">
                        © {new Date().getFullYear()} DEVVERSE CORE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-black tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Systems Operational</span>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
