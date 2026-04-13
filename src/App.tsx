import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CodePlayground from './pages/CodePlayground';
import DevQuiz from './pages/DevQuiz';
import ColorGenerator from './pages/ColorGenerator';
import NotesApp from './pages/NotesApp';
import ResumeBuilder from './pages/ResumeBuilder';
import AIAssistant from './pages/AIAssistant';
import Contact from './components/contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoadmapBuilder from './pages/RoadmapBuilder';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';

import { RoadmapProvider } from './contexts/RoadmapContext';

import { useEffect } from 'react';
import DevHUD from './components/DevHUD';

function App() {
  useEffect(() => {
    console.log(`%c
    ██████╗ ███████╗██╗   ██╗██╗   ██╗███████╗██████╗ ███████╗███████╗
    ██╔══██╗██╔════╝██║   ██║██║   ██║██╔════╝██╔══██╗██╔════╝██╔════╝
    ██║  ██║█████╗  ██║   ██║██║   ██║█████╗  ██████╔╝███████╗█████╗  
    ██║  ██║██╔══╝  ╚██╗ ██╔╝╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██╔══╝  
    ██████╔╝███████╗ ╚████╔╝  ╚████╔╝ ███████╗██║  ██║███████║███████╗
    ╚═════╝ ╚══════╝  ╚═══╝    ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
    `, "color: #0891b2; font-weight: bold;");
    console.log("%cSYSTEM STATUS: OPERATIONAL", "color: #10b981; font-weight: bold;");
    console.log("%cAI CORE: CONNECTED (GEMINI-FLASH)", "color: #8b5cf6");
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <RoadmapProvider>
          <div className="min-h-screen text-slate-900 dark:text-white relative bg-slate-50 dark:bg-[#05050A] flex flex-col transition-colors duration-300 overflow-x-hidden">
            {/* GLOBAL DEVELOPER OVERLAY ELEMENTS */}
            <div className="fixed inset-0 grid-background pointer-events-none z-0"></div>
            <div className="scanline"></div>
            <DevHUD />

            <Navbar />
            <main className="flex-grow w-full py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 relative z-10">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/playground" element={<ProtectedRoute><CodePlayground /></ProtectedRoute>} />
                <Route path="/devquiz" element={<ProtectedRoute><DevQuiz /></ProtectedRoute>} />
                <Route path="/color-generator" element={<ProtectedRoute><ColorGenerator /></ProtectedRoute>} />
                <Route path="/notes" element={<ProtectedRoute><NotesApp /></ProtectedRoute>} />
                <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path="/roadmaps" element={<ProtectedRoute><RoadmapBuilder /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </RoadmapProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
