import { useMemo, useState } from 'react';
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
    <div className="max-w-6xl mx-auto">
      <div className="relative mt-12 mb-12 animate-fade-in text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/20 via-violet-400/10 to-pink-400/20 blur-3xl" />

        <h1 className="relative text-4xl font-black md:text-6xl mb-4 tracking-tight text-slate-900 dark:text-white">
          Welcome, {user?.name.split(' ')[0] || 'Dev'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-fuchsia-300">to DevVerse Tool Hub</span>
        </h1>

        <p className="relative text-sm md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore curated developer utilities grouped for speed and creativity. Search, filter, and launch tools instantly.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools by name or description..."
          className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/40"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              activeCategory === 'All'
                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                : 'border-white/20 text-slate-200 hover:border-cyan-400 hover:text-cyan-100'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? 'border-violet-400 bg-violet-500/20 text-violet-100'
                  : 'border-white/20 text-slate-200 hover:border-violet-400 hover:text-violet-100'
              }`}
            >
              {category}
            </button>
          ))}
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

      <SocialIcons />
    </div>
  );
}
