import React, { useState } from 'react';

import { Check, Mail, Key, Zap, ArrowRight, Activity } from 'lucide-react';

interface QuickStartGuideProps {
  onNavigate: (tab: string) => void;
  onGenerateKey: () => void;
  onFireTest: (email: string) => void;
}

export function QuickStartGuide({ onNavigate, onGenerateKey, onFireTest }: QuickStartGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [testEmail, setTestEmail] = useState('');
  const [isFiring, setIsFiring] = useState(false);

  const toggleStep = (step: number) => {
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter(s => s !== step));
    } else {
      setCompletedSteps([...completedSteps, step]);
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  };

  const handleFireTest = () => {
    if (!testEmail) return;
    setIsFiring(true);
    setTimeout(() => {
      setIsFiring(false);
      toggleStep(3);
      setTestEmail('');
      setTimeout(() => {
        onFireTest(testEmail);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="relative mb-8 w-full max-w-4xl mx-auto rounded-3xl p-[1px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/20 via-neutral-500/10 to-black/5 dark:to-white/10 opacity-50 pointer-events-none" />
      
      <div className="relative bg-white/10 dark:bg-[#111111]/60 backdrop-blur-3xl rounded-[22px] border border-neutral-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 lg:p-10 flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-neutral-900 dark:text-white text-[10px] font-mono tracking-widest uppercase font-semibold mb-2">
              <Activity className="w-3 h-3" />
              Initialization Protocol
            </div>
            <h2 className="text-3xl font-display text-neutral-900 dark:text-white tracking-tight">System Ready</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-md">
              Your outbound telemetry matrix is offline. Complete these three steps to provision your node, secure your keys, and verify live tracking signals on the map.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="group relative bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 p-4 rounded-xl transition-all duration-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleStep(1)}
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors duration-300 border shadow-inner ${completedSteps.includes(1) ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-black' : 'bg-black/5 dark:bg-black/50 border-black/10 dark:border-white/10 text-transparent hover:border-black/30 dark:hover:border-white/30'}`}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </button>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-zinc-200">Provision Outbound Node</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Connect your SMTP credentials</p>
                </div>
              </div>
              <button 
                onClick={() => { onNavigate('mail'); toggleStep(1); }}
                className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-white dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-zinc-200 rounded-lg transition-colors"
              >
                Connect <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="group relative bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 p-4 rounded-xl transition-all duration-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleStep(2)}
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors duration-300 border shadow-inner ${completedSteps.includes(2) ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-black' : 'bg-black/5 dark:bg-black/50 border-black/10 dark:border-white/10 text-transparent hover:border-black/30 dark:hover:border-white/30'}`}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </button>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-zinc-200">Generate Encryption Key</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Secure your API endpoints</p>
                </div>
              </div>
              <button 
                onClick={() => { onGenerateKey(); toggleStep(2); }}
                className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-zinc-300 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 rounded-lg transition-all"
              >
                <Key className="w-3 h-3" /> Generate
              </button>
            </div>

            <div className="group relative bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent dark:to-white/[0.02] border border-black/5 dark:border-white/5 p-4 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={() => toggleStep(3)}
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors duration-300 border shadow-inner ${completedSteps.includes(3) ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-black' : 'bg-black/5 dark:bg-black/50 border-black/10 dark:border-white/10 text-transparent hover:border-black/30 dark:hover:border-white/30'}`}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </button>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-zinc-200">Fire Outbound Test Signal</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Simulate a live tracking pixel open</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:pl-10">
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input 
                    type="email"
                    placeholder="Enter email to simulate..."
                    value={testEmail}
                    onChange={e => setTestEmail(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-600 focus:outline-none focus:border-neutral-400 dark:focus:border-white/50 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-white/50 transition-all font-mono"
                  />
                </div>
                <button 
                  onClick={handleFireTest}
                  disabled={!testEmail || isFiring}
                  className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto text-[11px] font-mono uppercase tracking-wider font-semibold text-white dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-zinc-200 disabled:opacity-50 rounded-lg transition-all whitespace-nowrap"
                >
                  {isFiring ? (
                    <span className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5" />
                  )}
                  Send Test
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-64 border-l border-black/5 dark:border-white/5 pl-12">
          <div className="relative w-48 h-48 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
            <div className={`absolute inset-0 rounded-full border border-neutral-900/30 dark:border-white/30 transition-opacity duration-700 ${completedSteps.length === 3 ? 'opacity-100 animate-[spin_4s_linear_infinite]' : 'opacity-0'}`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <div className={`absolute inset-4 rounded-full border border-neutral-900/20 dark:border-white/20 transition-opacity duration-700 ${completedSteps.length === 3 ? 'opacity-100 animate-[spin_3s_linear_infinite_reverse]' : 'opacity-0'}`} />
            <div className="relative z-10 text-center space-y-2">
              <span className="text-4xl font-display font-light text-neutral-900 dark:text-white tracking-tighter">
                {completedSteps.length} <span className="text-zinc-400 dark:text-zinc-600">/ 3</span>
              </span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                {completedSteps.length === 3 ? <span className="text-neutral-900 dark:text-white">System Online</span> : 'Modules Pending'}
              </p>
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-neutral-900 dark:bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-neutral-900 dark:bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-neutral-900 dark:bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
