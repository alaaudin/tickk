import React, { useState } from 'react';
import { Save, User, Shield, Key } from 'lucide-react';

export function AccountSettingsPanel({ toast }: { toast: (message: string, type: 'success' | 'error') => void }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Account settings updated securely.", "success");
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-20">
      <div>
        <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Account Profile</h2>
        <p className="text-xs text-zinc-500 mt-1 font-sans">Manage your personal information and security credentials.</p>
      </div>

      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-neutral-100 dark:border-zinc-800/50 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white font-display">Personal Details</h3>
            <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Update your contact and identity data</p>
          </div>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-neutral-700 dark:text-zinc-300 font-sans">First Name</label>
              <input type="text" defaultValue="John" className="w-full bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-neutral-700 dark:text-zinc-300 font-sans">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-sans" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-neutral-700 dark:text-zinc-300 font-sans">Email Address</label>
            <input type="email" defaultValue="admin@company.com" disabled className="w-full bg-neutral-100 dark:bg-[#08080a]/50 border border-neutral-200 dark:border-zinc-800/50 text-sm rounded-xl px-4 py-3 text-neutral-500 dark:text-zinc-500 cursor-not-allowed font-mono" />
            <p className="text-[10px] text-zinc-500 font-sans mt-1">To change your email, please contact support for security verification.</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end relative z-10">
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
