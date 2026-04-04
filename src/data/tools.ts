import {
  Code,
  FileText,
  BrainCircuit,
  Palette,
  StickyNote,
  Map,
  LucideIcon,
} from 'lucide-react';

export type ToolCategory = 'Coding Tools' | 'Productivity Tools' | 'Fun Tools';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: ToolCategory;
  color: string;
  bg: string;
}

export const tools: ToolItem[] = [
  {
    id: 'ai-roadmaps',
    name: 'AI Roadmaps',
    description: 'Generate personalized step-by-step learning timelines.',
    icon: Map,
    path: '/roadmaps',
    category: 'Productivity Tools',
    color: 'text-purple-400',
    bg: 'bg-purple-400/20',
  },
  {
    id: 'code-playground',
    name: 'Code Playground',
    description: 'Live HTML/CSS/JS editor with instant preview.',
    icon: Code,
    path: '/playground',
    category: 'Coding Tools',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/20',
  },
  {
    id: 'notes-app',
    name: 'Notes App',
    description: 'Save and manage notes with local persistence.',
    icon: StickyNote,
    path: '/notes',
    category: 'Productivity Tools',
    color: 'text-yellow-300',
    bg: 'bg-yellow-300/20',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Create polished resumes with one-click export.',
    icon: FileText,
    path: '/resume-builder',
    category: 'Productivity Tools',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-400/20',
  },
  {
    id: 'devquiz',
    name: 'DevQuiz',
    description: 'Challenge yourself with coding quizzes.',
    icon: BrainCircuit,
    path: '/devquiz',
    category: 'Fun Tools',
    color: 'text-green-400',
    bg: 'bg-green-400/20',
  },
  {
    id: 'color-generator',
    name: 'Color Generator',
    description: 'Generate, adjust, and copy color palettes.',
    icon: Palette,
    path: '/color-generator',
    category: 'Fun Tools',
    color: 'text-pink-400',
    bg: 'bg-pink-400/20',
  },
];
