import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="w-full flex flex-col space-y-1">
            {label && <label className="text-sm font-medium text-slate-700 dark:text-gray-300">{label}</label>}
            <input
                className={`bg-white/60 dark:bg-surface/80 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/50 shadow-inner transition-colors duration-300 w-full ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
    return (
        <div className="w-full flex flex-col space-y-1">
            {label && <label className="text-sm font-medium text-slate-700 dark:text-gray-300">{label}</label>}
            <textarea
                className={`bg-white/60 dark:bg-surface/80 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/50 shadow-inner transition-colors duration-300 w-full font-mono text-sm ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
