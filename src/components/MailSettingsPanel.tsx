import React, { useState } from 'react';
import { Save, Plus, Mail, CheckCircle2 } from 'lucide-react';
import { GmailLogo, OutlookLogo } from './OfficialLogos';

export function MailSettingsPanel({ toast }: { toast: (message: string, type: 'success' | 'error') => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState<string | null>('gmail');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Mail integrations updated successfully.", "success");
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-20">
      <div>
        <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Mail Integrations</h2>
        <p className="text-xs text-zinc-500 mt-1 font-sans">Connect your email providers for seamless tracking and telemetry injection.</p>
      </div>

      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-neutral-100 dark:border-zinc-800/50 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white font-display">Connected Accounts</h3>
            <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Manage your authenticated email providers</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {/* Gmail */}
          <div className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${activeIntegration === 'gmail' ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-200 dark:border-indigo-500/30' : 'bg-neutral-50 dark:bg-zinc-900/30 border-transparent hover:border-neutral-200 dark:hover:border-zinc-800'}`} onClick={() => setActiveIntegration('gmail')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-neutral-100">
                <GmailLogo className="w-full h-full" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white font-sans">Google Workspace / Gmail</h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Connected as admin@company.com</p>
              </div>
            </div>
            {activeIntegration === 'gmail' ? (
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold font-sans">
                <CheckCircle2 className="w-4 h-4" /> Active
              </div>
            ) : (
              <button className="text-xs font-semibold text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                Connect
              </button>
            )}
          </div>

          {/* Outlook */}
          <div className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${activeIntegration === 'outlook' ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-200 dark:border-indigo-500/30' : 'bg-neutral-50 dark:bg-zinc-900/30 border-transparent hover:border-neutral-200 dark:hover:border-zinc-800'}`} onClick={() => setActiveIntegration('outlook')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-neutral-100">
                <OutlookLogo className="w-full h-full" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white font-sans">Microsoft Outlook / Office 365</h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Not connected</p>
              </div>
            </div>
            {activeIntegration === 'outlook' ? (
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold font-sans">
                <CheckCircle2 className="w-4 h-4" /> Active
              </div>
            ) : (
              <button className="text-xs font-semibold text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                Connect
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all font-mono disabled:opacity-50"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
