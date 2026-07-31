/// <reference types="chrome" />
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ExternalLink, Mail, Check, CheckCheck, LogOut, Eye, Link2, ChevronDown, Plus, User } from 'lucide-react';
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
  <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-[#27272a] bg-[#0c0c0e] hover:border-[#3f3f46] transition-all">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-[#27272a] flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <span className="text-[13px] font-medium text-zinc-300">{label}</span>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-10 h-[22px] rounded-full transition-all duration-300 ${
        enabled
          ? 'bg-emerald-500'
          : 'bg-[#3f3f46]'
      }`}
    >
      <div className={`absolute top-[3px] w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
        enabled
          ? 'left-[22px] bg-white'
          : 'left-[3px] bg-zinc-500'
      }`} />
    </button>
  </div>
);

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    // Force dark mode always — matches dashboard theme
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');

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
          setAccounts(changes.tickk_accounts.newValue as AccountInfo[]);
        }
        if (changes.tickk_tracking_toggles?.newValue) {
          setTrackingToggles(changes.tickk_tracking_toggles.newValue as TrackingToggles);
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
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/20">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[9px] font-semibold text-red-400">Gmail</span>
          </span>
        );
      case 'outlook':
      case 'azure':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
              <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
              <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
              <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
            </svg>
            <span className="text-[9px] font-semibold text-blue-400">Outlook</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-500/10 border border-zinc-500/20">
            <Mail className="w-3 h-3 text-zinc-500" />
            <span className="text-[9px] font-semibold text-zinc-400">Email</span>
          </span>
        );
    }
  };

  return (
    <div className="w-[380px] h-auto min-h-[500px] flex flex-col bg-[#09090b] text-zinc-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#1c1c1f] bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-[15px] tracking-tight text-white">Tickk</span>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={togglePause}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                isPaused
                  ? 'bg-red-500/8 border-red-500/20'
                  : 'bg-emerald-500/8 border-emerald-500/20'
              }`}
              title={isPaused ? 'Click to resume tracking' : 'Click to pause tracking'}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                isPaused ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'
              }`} />
              <span className={`text-[10px] font-medium ${
                isPaused ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {isPaused ? 'Paused' : 'Active'}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-5 overflow-y-auto">
        {!isAuthenticated ? (
          /* ─── Auth Screen: Dark minimal ─── */
          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full pt-4 text-center">
            {/* Logo */}
            <div className="w-14 h-14 bg-[#111113] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#27272a] shadow-lg shadow-black/20">
              <CheckCheck className="w-7 h-7 text-emerald-400" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-display font-bold mb-1.5 text-white">Tickk</h2>
            <p className="text-[13px] text-zinc-500 mb-1">Email Tracking, Simplified.</p>
            <p className="text-[11px] text-zinc-600 mb-8">
              Connect your Gmail or Outlook to enable invisible email tracking.
            </p>

            {/* Auth Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={openOnboardingPage}
                className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-zinc-900 text-[13px] font-semibold rounded-lg transition-all flex items-center justify-center gap-2.5 shadow-sm"
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
                className="w-full py-2.5 px-4 bg-[#18181b] hover:bg-[#27272a] text-zinc-300 text-[13px] font-medium rounded-lg transition-all flex items-center justify-center gap-2.5 border border-[#27272a]"
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

            {/* Subtle footer hint */}
            <p className="text-[10px] text-zinc-600 mt-6 font-mono tracking-wide">
              Opens tickk.online in a new tab
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4">
            {/* Active Account Card */}
            <div className="relative">
              <button
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="w-full p-4 rounded-xl border border-[#27272a] bg-[#111113] flex items-center justify-between group hover:border-[#3f3f46] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#27272a] flex items-center justify-center border border-[#3f3f46]">
                    <User className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium text-zinc-100 truncate max-w-[180px]">
                        {activeAccount?.email || 'Connected Account'}
                      </p>
                      {activeAccount && getProviderBadge(activeAccount.provider)}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {credits} credits remaining
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Dropdown */}
              {showAccountDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-[#111113] border border-[#27272a] rounded-xl shadow-xl shadow-black/30 z-20 overflow-hidden">
                  {accounts.map((account, index) => (
                    <button
                      key={index}
                      onClick={() => switchAccount(index)}
                      className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#1a1a1f] transition-colors text-left ${
                        index === activeAccountIndex ? 'bg-[#1a1a1f]' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#27272a] flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-zinc-200 truncate">{account.email}</p>
                      </div>
                      {getProviderBadge(account.provider)}
                      {index === activeAccountIndex && (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      )}
                    </button>
                  ))}

                  {/* Add Provider */}
                  <div className="border-t border-[#27272a] mt-1 pt-1">
                    <button
                      onClick={() => { setShowAccountDropdown(false); openOnboardingPage(); }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#1a1a1f] transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#18181b] flex items-center justify-center border border-dashed border-zinc-700">
                        <Plus className="w-3.5 h-3.5 text-zinc-500" />
                      </div>
                      <span className="text-xs text-zinc-500 font-medium">Add another provider</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Toggles */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest font-semibold text-zinc-600 px-1 mb-2">Quick Toggles</h3>
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
                <h3 className="text-[13px] font-semibold text-zinc-200">Recent Activity</h3>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-emerald-500/70 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="space-y-1.5">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-3 rounded-lg border border-[#1c1c1f] hover:border-[#27272a] bg-[#0c0c0e] flex items-start gap-3 transition-all">
                    <div className="mt-0.5">
                      {activity.status === 'opened' ? (
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Check className="w-4 h-4 text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-[12px] font-medium text-zinc-200 truncate">
                          {activity.email}
                        </p>
                        <span className="text-[10px] text-zinc-600 whitespace-nowrap">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate">
                        {activity.subject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {recentActivity.length === 0 && (
                <div className="py-8 text-center border border-dashed border-[#27272a] rounded-lg">
                  <Mail className="w-6 h-6 text-zinc-700 mx-auto mb-2" />
                  <p className="text-xs text-zinc-500">No recent tracked emails</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-[#1c1c1f] bg-[#09090b]/80 backdrop-blur-md">
        <div className="flex gap-2">
          <button
            onClick={openDashboard}
            className="flex-1 py-2.5 px-4 bg-[#18181b] hover:bg-[#27272a] text-zinc-300 text-[13px] font-medium rounded-lg transition-all flex items-center justify-center gap-2 border border-[#27272a] group"
          >
            <span>Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="py-2.5 px-3 bg-[#18181b] hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg transition-all border border-[#27272a] hover:border-red-500/20"
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
