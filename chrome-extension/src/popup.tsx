/// <reference types="chrome" />
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Moon, Sun, ExternalLink, Mail, Check, CheckCheck, Activity, LogOut } from 'lucide-react';
import './index.css';

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const credits = 400;

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, email: 'client@company.com', subject: 'Project Proposal Update', status: 'opened', time: '10m ago' },
    { id: 2, email: 'investor@vc.com', subject: 'Q3 Deck', status: 'sent', time: '1h ago' },
    { id: 3, email: 'sarah.j@startup.io', subject: 'Introduction', status: 'opened', time: '2h ago' },
  ];

  useEffect(() => {
    // Load theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }

    // Load API Key
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['tickk_api_key'], (result: { tickk_api_key?: string }) => {
        if (result.tickk_api_key) {
          setIsAuthenticated(true);
        }
      });
      
      // Listen for changes from background script
      const storageListener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
        if (changes.tickk_api_key && changes.tickk_api_key.newValue) {
          setIsAuthenticated(true);
        } else if (changes.tickk_api_key && !changes.tickk_api_key.newValue) {
          setIsAuthenticated(false);
        }
      };
      
      chrome.storage.onChanged.addListener(storageListener);
      
      return () => {
        chrome.storage.onChanged.removeListener(storageListener);
      };
    } else {
      // Fallback for local development testing
      const localKey = localStorage.getItem('tickk_api_key');
      if (localKey) setIsAuthenticated(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const openAuthPage = () => {
    const url = 'https://tickk-ivory.vercel.app/extension-auth';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };


  const handleLogout = () => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove(['tickk_api_key'], () => {
        setIsAuthenticated(false);
        setApiKey('');
      });
    } else {
      localStorage.removeItem('tickk_api_key');
      setIsAuthenticated(false);
      setApiKey('');
    }
  };

  const openDashboard = () => {
    const url = 'https://tickk-ivory.vercel.app/dashboard';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="w-[380px] h-auto min-h-[500px] flex flex-col bg-white dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-[#27272a] bg-white/50 dark:bg-[#0c0c0e]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center">
            <Check className="w-4 h-4 text-white dark:text-neutral-900" strokeWidth={3} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">Tickk</span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-medium text-green-700 dark:text-green-400">Connected</span>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-[#27272a] transition-all"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-5 overflow-y-auto">
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full pt-4 text-center">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-[#27272a] rounded-xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 dark:border-[#3f3f46]">
              <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center">
                <Check className="w-4 h-4 text-white dark:text-neutral-900" strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-xl font-display font-bold mb-2">Connect your account</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
              Connect Tickk to enable invisible Gmail tracking.
            </p>
            
            <button
              onClick={openAuthPage}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2"
            >
              Connect Account
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full gap-5">
            {/* Credits Card */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-[#27272a] bg-neutral-50/50 dark:bg-[#121215]/50 flex items-center justify-between group hover:border-neutral-300 dark:hover:border-[#3f3f46] transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Tracking Credits</p>
                  <p className="text-lg font-bold font-mono tracking-tight">{credits}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#27272a] transition-all relative z-10" title="Disconnect">
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Recent Activity */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Recent Activity</h3>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Live</span>
              </div>
              
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-3 rounded-lg border border-neutral-100 dark:border-[#27272a] hover:border-neutral-200 dark:hover:border-[#3f3f46] bg-white dark:bg-[#0c0c0e] flex items-start gap-3 transition-all">
                    <div className="mt-0.5">
                      {activity.status === 'opened' ? (
                        <CheckCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <Check className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {activity.email}
                        </p>
                        <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {activity.subject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {recentActivity.length === 0 && (
                <div className="py-8 text-center border border-dashed border-neutral-200 dark:border-[#27272a] rounded-lg">
                  <Mail className="w-6 h-6 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">No recent tracked emails</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-neutral-100 dark:border-[#27272a] bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-md">
        <button
          onClick={openDashboard}
          className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#27272a] dark:hover:bg-[#3f3f46] text-neutral-900 dark:text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
        >
          <span>Open Full Dashboard</span>
          <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-white transition-colors" />
        </button>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
