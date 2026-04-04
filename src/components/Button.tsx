import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = "relative px-6 py-3 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

    const variants = {
        primary: "bg-primary/10 text-slate-900 dark:text-white border border-primary/50 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
        secondary: "bg-slate-100 dark:bg-surface/80 text-slate-900 dark:text-gray-200 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1a1c2e]",
        danger: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
        ghost: "bg-transparent hover:bg-slate-200 dark:hover:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white",
        outline: "border-2 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {/* Cyber sheen effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </button>
    );
}
