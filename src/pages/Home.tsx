import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SocialIcons from '../components/socialicon';
import CategorySection from '../components/CategorySection';
import { tools, ToolCategory } from '../data/tools';

const categories: Array<ToolCategory> = ['Coding Tools', 'Productivity Tools', 'Fun Tools'];

export default function Home() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    const bySearch = tools.filter((tool) => {
      if (!query) return true;
      return tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query);
    });

    if (activeCategory === 'All') return bySearch;

    return bySearch.filter((tool) => tool.category === activeCategory);
  }, [search, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* RADIANT HERO SECTION (Reference: Sun/Marline Aesthetic) */}
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center pt-20 pb-12 overflow-visible">
        
        {/* THE BURNING SUN (Orange Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-gradient-to-tr from-orange-600 via-yellow-500 to-transparent blur-[120px] opacity-40 dark:opacity-60 animate-pulse pointer-events-none" />
        
        {/* GENERATED BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
           <img 
            src="/C:/Users/sonu8/.gemini/antigravity/brain/862ad19b-71aa-4bc6-99e7-788d1884afba/futuristic_dev_nexus_bg_1776111306328.png" 
            alt="Futuristic Background" 
            className="w-full h-full object-cover rounded-[3rem] mix-blend-screen"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 space-y-8"
        >
          <div className="flex flex-col items-center space-y-4">
             <span className="px-5 py-2 text-[10px] md:text-xs font-black tracking-[0.3em] text-orange-400 uppercase bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-md">
              The Nexus of Creation
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          </div>

          <h1 className="relative">
            <span className="block text-slate-900 dark:text-gray-100 font-display text-3xl md:text-7xl font-light tracking-tighter mb-2 leading-tight">Welcome, {user?.name.split(' ')[0] || 'Dev'}</span>
            <span className="block font-accent text-2xl md:text-6xl text-gradient-premium tracking-wide leading-tight">DevVerse Tool Hub</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-lg text-slate-600 dark:text-slate-400 font-medium leading-[1.8] opacity-80">
            A minimalist sanctuary for high-end developer utilities. 
            <span className="dark:text-slate-200"> Refined for those who build the extraordinary.</span>
          </p>
        </motion.div>
      </div>

      {/* SEARCH & FILTER GLASS PANEL (Minimalist Overlay) */}
      <div className="relative z-20 -mt-10 mb-16 max-w-4xl mx-auto">
        <div className="glass-panel p-2 md:p-4 rounded-2xl md:rounded-full border border-white/10 dark:bg-black/40 shadow-2xl backdrop-blur-3xl flex flex-col md:flex-row gap-4 items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the nexus..."
            className="flex-grow bg-transparent px-6 py-2 text-slate-900 dark:text-white outline-none placeholder-slate-500 font-medium text-lg w-full"
          />
          
          <div className="flex flex-wrap justify-center items-center gap-2 p-1">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === 'All' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-500 hover:text-orange-400'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === category ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-500 hover:text-cyan-400'}`}
              >
                {category.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {categories.map((category) => {
        const sectionTools = filteredTools.filter((tool) => tool.category === category);
        if (!sectionTools.length) return null;

        return <CategorySection key={category} title={category} tools={sectionTools} />;
      })}

      {filteredTools.length === 0 && (
        <div className="animate-fade-in rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-10 text-center">
          <p className="text-slate-200">No tools matched your search / filter. Try another keyword.</p>
        </div>
      )}

    </div>
  );
}
