import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ToolItem } from '../data/tools';

interface ToolCardProps {
  tool: ToolItem;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      to={tool.path}
      className="group h-full"
      aria-label={`Open ${tool.name}`}
    >
      <article
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg shadow-[0_15px_40px_rgba(15,23,42,0.25)] transition-all duration-300 will-change-transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-violet-500/10 to-rose-400/10" />
          <div className="pointer-events-none absolute inset-0 border border-cyan-400/20 rounded-xl blur-sm" />
        </div>

        <div className="relative z-10 flex items-center gap-3 mb-4">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.bg} ${tool.color}`}>
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-bold font-display leading-tight text-white tracking-tight">{tool.name}</h3>
        </div>

        <p className="relative z-10 text-sm leading-6 text-slate-400 mb-5 font-medium">{tool.description}</p>

        <div className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan-200 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Open</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </article>
    </Link>
  );
}
