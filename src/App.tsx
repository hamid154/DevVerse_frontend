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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoadmapProvider>
          <div className="min-h-screen text-slate-900 dark:text-white relative bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
          <Navbar />
          <main className="flex-grow w-full py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0">
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
