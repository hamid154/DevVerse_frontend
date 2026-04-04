import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white/80 dark:bg-surface/60 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none rounded-xl overflow-hidden
        ${hoverable ? 'hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer transition-all duration-300 transform hover:-translate-y-1' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
