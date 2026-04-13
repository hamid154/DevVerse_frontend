import { useEffect, useRef, useState } from 'react';
import { ToolItem } from '../data/tools';
import ToolCard from './ToolCard';

interface CategorySectionProps {
  title: string;
  tools: ToolItem[];
}

export default function CategorySection({ title, tools }: CategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`mb-12 space-y-6 ${visible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}
    >
      <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-8 glass-heading">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
