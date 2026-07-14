import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthPortal from "./components/AuthPortal";
import Dashboard from "./components/Dashboard";
import { ToastProvider } from "./components/Toast";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import { User } from "./types";

type ViewType = 'landing' | 'auth' | 'dashboard' | 'privacy' | 'terms';

export default function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem("tickk_theme") as 'light' | 'dark') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  // Load existing session from storage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("tickk_user");
      const storedToken = localStorage.getItem("tickk_token");

      if (storedUser && storedToken) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setView('dashboard');
        } catch (e) {
          console.error("Failed to restore session", e);
          localStorage.removeItem("tickk_user");
          localStorage.removeItem("tickk_token");
        }
      }
    } catch (e) {
      console.error("Failed to access localStorage during session load", e);
    }
  }, []);

  // Sync theme to DOM
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem("tickk_theme", "dark");
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem("tickk_theme", "light");
      }
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAuthSuccess = (authUser: User, authToken: string) => {
    setUser(authUser);
    setToken(authToken);
    try {
      localStorage.setItem("tickk_user", JSON.stringify(authUser));
      localStorage.setItem("tickk_token", authToken);
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("tickk_user");
      localStorage.removeItem("tickk_token");
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    setView('landing');
  };

  const handleQuickStart = (email: string) => {
    setAuthMode('signup');
    setView('auth');
  };

  return (
    <ToastProvider>
    <div className="bg-white dark:bg-[#0c0c0e] bg-gradient-to-b from-white via-white to-white dark:from-[#0c0c0e] dark:via-[#09090b] dark:to-[#050506] text-[#111] dark:text-zinc-100 min-h-screen font-sans antialiased transition-colors duration-300 relative overflow-x-hidden">
      {/* Animated Blurry Premium Background Blobs - Light mode gets dark blobs, Dark mode gets light blobs - extremely faint opacity for high elegance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[140px] sm:blur-[200px] mix-blend-multiply dark:mix-blend-screen opacity-[0.035] dark:opacity-[0.07] animate-blob-slow bg-neutral-950 dark:bg-white top-[-8%] left-[-8%]" />
        <div className="absolute w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] rounded-full blur-[150px] sm:blur-[220px] mix-blend-multiply dark:mix-blend-screen opacity-[0.03] dark:opacity-[0.06] animate-blob-slow-reverse bg-zinc-900 dark:bg-neutral-100 bottom-[-12%] right-[-8%]" />
        <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[120px] sm:blur-[180px] mix-blend-multiply dark:mix-blend-screen opacity-[0.02] dark:opacity-[0.05] animate-blob-slow bg-neutral-900 dark:bg-zinc-200 top-[30%] left-[50%] -translate-x-1/2" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        {view === 'landing' && (
          <LandingPage 
            onNavigateToAuth={(mode) => {
              setAuthMode(mode);
              setView('auth');
            }}
            onQuickStart={handleQuickStart}
            onNavigateToLegal={(legalView) => setView(legalView)}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}

        {view === 'auth' && (
          <AuthPortal 
            initialMode={authMode}
            onAuthSuccess={handleAuthSuccess}
            onNavigateHome={() => setView('landing')}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}

        {view === 'dashboard' && token && user && (
          <Dashboard 
            token={token}
            onLogout={handleLogout}
            userEmail={user.email}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}

        {view === 'privacy' && (
          <PrivacyPolicy 
            onBack={() => setView('landing')}
            theme={theme}
          />
        )}

        {view === 'terms' && (
          <TermsOfService 
            onBack={() => setView('landing')}
            theme={theme}
          />
        )}
      </div>
    </div>
    </ToastProvider>
  );
}
