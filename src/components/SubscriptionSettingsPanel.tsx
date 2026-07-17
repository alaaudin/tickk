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

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 dark:bg-zinc-900/30 rounded-xl p-5 border border-neutral-200 dark:border-zinc-800 relative overflow-hidden">
            {!isPremium && (
              <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center">
                <Lock className="w-8 h-8 text-neutral-400 dark:text-zinc-500 mb-2" />
                <span className="text-sm font-semibold text-neutral-800 dark:text-zinc-200">Premium Required</span>
                <span className="text-[10px] text-neutral-500 dark:text-zinc-400 mt-1">Upgrade to unlock full features</span>
              </div>
            )}
            <div className={`transition-opacity ${!isPremium ? 'opacity-30 blur-sm' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display uppercase tracking-widest">Premium</h4>
                  <p className="text-xs text-zinc-500 font-sans mt-1">Billed annually</p>
                </div>
                <span className="px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded">Active</span>
              </div>
              <div className="text-3xl font-light text-neutral-900 dark:text-white font-display mb-4">
                $299<span className="text-sm text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                {['Unlimited Telemetry', 'Custom Domains (CTD)', 'Priority Support'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-zinc-300 font-sans">
                    <Check className="w-3 h-3 text-indigo-500" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-white text-xs font-semibold rounded-lg hover:bg-neutral-300 dark:hover:bg-zinc-700 transition-colors font-sans cursor-pointer">
                Manage Billing
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 rounded-xl p-5">
              <h5 className="text-[11px] font-semibold text-neutral-900 dark:text-zinc-300 font-sans mb-3 flex items-center gap-2">
                <Zap className="w-3 h-3 text-amber-500" /> Usage This Month
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Available Credits</span>
                  <span className="text-neutral-900 dark:text-white font-semibold">{profile?.credits ?? 501}</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, ((profile?.credits ?? 501) / 1000) * 100))}%` }}></div>
                </div>
                <p className="text-[10px] text-zinc-500 font-sans text-right">Based on standard limits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
