import React from 'react';
import { CreditCard, Check, Zap, Lock } from 'lucide-react';
import { UserProfile } from '../hooks/useProfile';

export function SubscriptionSettingsPanel({ toast, profile }: { toast: (message: string, type: 'success' | 'error') => void, profile?: UserProfile | null }) {
  const isPremium = profile?.plan === 'premium';
  
  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-20">
      <div>
        <h2 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Subscription Plan</h2>
        <p className="text-xs text-zinc-500 mt-1 font-sans">Manage your current billing cycle and usage limits.</p>
      </div>

      <div className="bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 rounded-[22px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-neutral-100 dark:border-zinc-800/50 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white font-display">Current Plan</h3>
            <p className="text-[11px] text-zinc-500 font-sans mt-0.5">You are currently on the {isPremium ? 'Premium tier' : 'Free tier'}</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 bg-neutral-50/50 dark:bg-[#0a0a0c]/50 rounded-xl border border-neutral-200/50 dark:border-white/5 overflow-hidden min-h-[300px]">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-md">
            <div className="w-12 h-12 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl border border-neutral-300/50 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl">
              <Lock className="w-5 h-5 text-neutral-500 dark:text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white mb-2">
              BILLING MODULE LOCKED
            </h3>
            <p className="text-xs text-neutral-500 dark:text-zinc-400 font-mono tracking-widest uppercase mb-6">
              ENTERPRISE PAYMENT GATEWAY COMING SOON
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-zinc-700 to-transparent mb-6" />
            <div className="text-[10px] text-zinc-400 font-mono opacity-50 break-all leading-relaxed">
              [SCRAMBLED_TOTAL_0x99A3F1] [ENCRYPTED_UI_0x1] [CORRUPTED_BLOB_TOKEN_0x4F] [GARBLED_PAYMENT_DATA_0x7] [REDACTED_PIPELINE_0xAF]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
