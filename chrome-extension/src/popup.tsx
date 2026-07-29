/// <reference types="chrome" />
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Moon, Sun, ExternalLink, Mail, Check, CheckCheck, Activity, LogOut, Eye, Link2, ChevronDown, Plus, User } from 'lucide-react';
import './index.css';

interface AccountInfo {
  email: string;
  provider: 'gmail' | 'outlook' | 'email';
  isActive: boolean;
}

interface TrackingToggles {
  trackOpens: boolean;
  trackClicks: boolean;
}

const ToggleSwitch = ({ enabled, onToggle, label, icon }: { enabled: boolean; onToggle: () => void; label: string; icon: React.ReactNode }) => (
  <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-neutral-100 dark:border-[#27272a] bg-white dark:bg-[#0c0c0e] hover:border-neutral-200 dark:hover:border-[#3f3f46] transition-all">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-[#27272a] flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        {icon}
      </div>
      <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-10 h-[22px] rounded-full transition-all duration-300 ${
        enabled
          ? 'bg-neutral-900 dark:bg-white'
          : 'bg-neutral-200 dark:bg-[#3f3f46]'
      }`}
    >
      <div className={`absolute top-[3px] w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
        enabled
          ? 'left-[22px] bg-white dark:bg-neutral-900'
          : 'left-[3px] bg-white dark:bg-neutral-600'
      }`} />
    </button>
  </div>
);

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [credits, setCredits] = useState(0);
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [activeAccountIndex, setActiveAccountIndex] = useState(0);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [trackingToggles, setTrackingToggles] = useState<TrackingToggles>({
    trackOpens: true,
    trackClicks: true,
  });
  const [isPaused, setIsPaused] = useState(false);

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

    // Load stored data
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['tickk_api_key', 'tickk_accounts', 'tickk_active_account', 'tickk_tracking_toggles', 'tickk_credits', 'tickk_paused'], (result: any) => {
        if (result.tickk_api_key) {
          setIsAuthenticated(true);
        }
        if (result.tickk_accounts && result.tickk_accounts.length > 0) {
          setAccounts(result.tickk_accounts);
          setActiveAccountIndex(result.tickk_active_account || 0);
        }
        if (result.tickk_tracking_toggles) {
          setTrackingToggles(result.tickk_tracking_toggles);
        }
        if (result.tickk_credits) {
          setCredits(result.tickk_credits);
        }
        if (result.tickk_paused) {
          setIsPaused(result.tickk_paused);
        }
      });

      // Listen for changes from background script
      const storageListener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
        if (changes.tickk_api_key && changes.tickk_api_key.newValue) {
          setIsAuthenticated(true);
        } else if (changes.tickk_api_key && !changes.tickk_api_key.newValue) {
          setIsAuthenticated(false);
        }
        if (changes.tickk_accounts?.newValue) {
          setAccounts(changes.tickk_accounts.newValue);
        }
        if (changes.tickk_tracking_toggles?.newValue) {
          setTrackingToggles(changes.tickk_tracking_toggles.newValue);
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

  const openOnboardingPage = () => {
    const url = 'https://tickk.online/onboarding';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleLogout = () => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove(['tickk_api_key', 'tickk_accounts', 'tickk_active_account', 'tickk_tracking_toggles', 'tickk_credits', 'tickk_paused'], () => {
        setIsAuthenticated(false);
        setAccounts([]);
        setActiveAccountIndex(0);
      });
    } else {
      localStorage.removeItem('tickk_api_key');
      setIsAuthenticated(false);
      setAccounts([]);
    }
  };

  const openDashboard = () => {
    const url = 'https://tickk.online/dashboard';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  const updateToggle = (key: keyof TrackingToggles) => {
    const newToggles = { ...trackingToggles, [key]: !trackingToggles[key] };
    setTrackingToggles(newToggles);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ tickk_tracking_toggles: newToggles });
    }
  };

  const togglePause = () => {
    const newPaused = !isPaused;
    setIsPaused(newPaused);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ tickk_paused: newPaused });
    }
  };

  const switchAccount = (index: number) => {
    setActiveAccountIndex(index);
    setShowAccountDropdown(false);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ tickk_active_account: index });
    }
  };

  const activeAccount = accounts[activeAccountIndex] || null;

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'gmail':
      case 'google':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[9px] font-semibold text-red-600 dark:text-red-400">Gmail</span>
          </span>
        );
      case 'outlook':
      case 'azure':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/20">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
              <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
              <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
              <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
            </svg>
            <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400">Outlook</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-500/10 border border-neutral-200/50 dark:border-neutral-500/20">
            <Mail className="w-3 h-3 text-neutral-500" />
            <span className="text-[9px] font-semibold text-neutral-600 dark:text-neutral-400">Email</span>
          </span>
        );
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
            <button
              onClick={togglePause}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all cursor-pointer ${
                isPaused
                  ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20'
                  : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20'
              }`}
              title={isPaused ? 'Click to resume tracking' : 'Click to pause tracking'}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                isPaused ? 'bg-red-500' : 'bg-green-500 animate-pulse'
              }`} />
              <span className={`text-[10px] font-medium ${
                isPaused ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'
              }`}>
                {isPaused ? 'Paused' : 'Active'}
              </span>
            </button>
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
              Connect your Gmail or Outlook account to enable invisible email tracking.
            </p>

            {/* Dual Provider Buttons */}
            <div className="space-y-3">
              <button
                onClick={openOnboardingPage}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Connect Gmail
              </button>

              <button
                onClick={openOnboardingPage}
                className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#27272a] dark:hover:bg-[#3f3f46] text-neutral-900 dark:text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
                </svg>
                Connect Outlook
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4">
            {/* Active Account Card */}
            <div className="relative">
              <button
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="w-full p-4 rounded-xl border border-neutral-200 dark:border-[#27272a] bg-neutral-50/50 dark:bg-[#121215]/50 flex items-center justify-between group hover:border-neutral-300 dark:hover:border-[#3f3f46] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-[#27272a] flex items-center justify-center border border-neutral-300 dark:border-[#3f3f46]">
                    <User className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100 truncate max-w-[180px]">
                        {activeAccount?.email || 'Connected Account'}
                      </p>
                      {activeAccount && getProviderBadge(activeAccount.provider)}
                    </div>
                    <p className="text-[11px] text-neutral-400 dark:text-zinc-500 mt-0.5">
                      {credits} credits remaining
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Dropdown */}
              {showAccountDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-[#27272a] rounded-xl shadow-lg z-20 overflow-hidden">
                  {accounts.map((account, index) => (
                    <button
                      key={index}
                      onClick={() => switchAccount(index)}
                      className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-neutral-50 dark:hover:bg-[#27272a] transition-colors text-left ${
                        index === activeAccountIndex ? 'bg-neutral-50/80 dark:bg-[#27272a]/50' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-[#3f3f46] flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{account.email}</p>
                      </div>
                      {getProviderBadge(account.provider)}
                      {index === activeAccountIndex && (
                        <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}

                  {/* Add Provider */}
                  <div className="border-t border-neutral-100 dark:border-[#27272a] mt-1 pt-1">
                    <button
                      onClick={() => { setShowAccountDropdown(false); openOnboardingPage(); }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-neutral-50 dark:hover:bg-[#27272a] transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-[#3f3f46] flex items-center justify-center border border-dashed border-neutral-300 dark:border-zinc-600">
                        <Plus className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Add another provider</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Toggles */}
            <div className="space-y-2">
              <h3 className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 dark:text-zinc-500 px-1 mb-2">Quick Toggles</h3>
              <ToggleSwitch
                enabled={trackingToggles.trackOpens}
                onToggle={() => updateToggle('trackOpens')}
                label="Track Opens"
                icon={<Eye className="w-3.5 h-3.5" />}
              />
              <ToggleSwitch
                enabled={trackingToggles.trackClicks}
                onToggle={() => updateToggle('trackClicks')}
                label="Track Clicks"
                icon={<Link2 className="w-3.5 h-3.5" />}
              />
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
        <div className="flex gap-2">
          <button
            onClick={openDashboard}
            className="flex-1 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#27272a] dark:hover:bg-[#3f3f46] text-neutral-900 dark:text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Dashboard</span>
            <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-white transition-colors" />
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="py-2.5 px-3 bg-neutral-100 hover:bg-red-50 dark:bg-[#27272a] dark:hover:bg-red-500/10 text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 rounded-lg transition-all"
              title="Disconnect"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
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
