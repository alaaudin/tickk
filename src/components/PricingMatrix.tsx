import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

interface PricingMatrixProps {
  onNavigateToAuth: (mode: 'login' | 'signup') => void;
  onBack: () => void;
}

export default function PricingMatrix({ onNavigateToAuth, onBack }: PricingMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [corrupted, setCorrupted] = useState(false);

  useEffect(() => {
    // F12 Inspect Tamper Shield Layer - Counter-Measure Structure
    // Using MutationObserver to detect removal or alteration of the overlay shield
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // If a node was removed
          mutation.removedNodes.forEach((node) => {
            if ((node as HTMLElement).id === 'tamper-shield') {
              setCorrupted(true);
            }
          });
        }
        if (mutation.type === 'attributes') {
          // If the style or class attribute of the shield was modified
          const target = mutation.target as HTMLElement;
          if (target.id === 'tamper-shield') {
            const currentDisplay = window.getComputedStyle(target).display;
            const currentVisibility = window.getComputedStyle(target).visibility;
            const currentOpacity = window.getComputedStyle(target).opacity;
            if (currentDisplay === 'none' || currentVisibility === 'hidden' || currentOpacity === '0') {
              setCorrupted(true);
            }
          }
        }
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class']
      });
    }

    return () => observer.disconnect();
  }, []);

  if (corrupted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="text-red-500 font-mono text-center max-w-lg break-words">
          <p className="text-xl mb-4 font-bold animate-pulse">[SYSTEM_LOCK_CORRUPTED_BLOB_TOKEN_0x99A3F1]</p>
          <p className="text-sm">Unauthorized Inspector Tampering Detected. Access Protocol Denied.</p>
          <div className="mt-8 grid grid-cols-8 gap-1 text-[8px] opacity-50">
            {Array.from({ length: 64 }).map((_, i) => (
              <span key={i}>{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0e] py-24 pt-32 px-6 lg:px-16 transition-colors duration-300">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium"
      >
        &larr; Back to Home
      </button>

      <div ref={containerRef} className="max-w-7xl mx-auto w-full relative">
        
        {/* Anti-Tamper Shield Layer */}
        <div 
          id="tamper-shield"
          className="absolute inset-0 z-50 backdrop-blur-xl pointer-events-none user-select-none select-none flex items-center justify-center bg-white/10 dark:bg-black/10 rounded-3xl overflow-hidden"
          style={{ padding: '2rem' }}
        >
          <div className="text-center p-8 rounded-2xl bg-white/40 dark:bg-black/40 border border-neutral-300/50 dark:border-neutral-700/50 shadow-2xl backdrop-blur-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white mb-2">
              BETA SUPPORTER PROGRAM ACTIVE
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono tracking-widest uppercase">
              ENTERPRISE PLANS COMING SOON
            </p>
          </div>
        </div>

        {/* Pricing Tiers Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase inline-flex items-center justify-center gap-2">PRICING TIERS</span>
          <h2 className="font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased text-3xl sm:text-4xl mt-3 mb-4">
            <span className="bg-gradient-to-r from-neutral-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
              Simple pricing for elite organizations
            </span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Start free today and upgrade as your corporate volume expands. Clear, predictable billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch relative">
          {/* Hobby Tier */}
          <div className="bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/80 rounded-xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div>
              <div className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e5e5e5_0%,#a1a1aa_50%,#e5e5e5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#18181b_0%,#71717a_50%,#18181b_100%)] opacity-80" />
                <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10">STARTER</span>
                </span>
              </div>
              <div className="flex items-baseline mt-4 mb-6">
                <span className="text-2xl font-sans font-light tracking-tighter text-neutral-400 dark:text-neutral-500 mr-0.5">$</span>
                <span className="text-5xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">[0x00]</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans ml-2">/ [UNIT_NULL]</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-6">[REDACTED_PIPELINE_DESC_0xAF] [BLOB_TOKEN] [CIPHER_FAIL_0x3C]</p>
              
              <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-8 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[REDACTED_ALLOC_0xAF] [SCRAMBLED_UNIT]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[CORRUPTED_PIXEL_0xB2] [TOKEN_VOID]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[SCRAMBLED_LOG_0xD7] [GARBLED_DURATION]</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="w-full py-2.5 bg-neutral-100 dark:bg-neutral-800/60 text-neutral-800 dark:text-white text-xs font-semibold rounded-lg transition-colors border border-neutral-200 dark:border-neutral-700/50 cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* Growth Tier (Most Popular) */}
          <div className="bg-white/80 dark:bg-[#16161b]/85 backdrop-blur-md border-2 border-neutral-900 dark:border-neutral-400 rounded-xl p-8 flex flex-col justify-between relative shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(255,255,255,0.03)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-neutral-900 dark:bg-neutral-200 text-white dark:text-black text-[9px] font-mono font-bold tracking-widest uppercase rounded-full border border-neutral-900 dark:border-neutral-300 shadow-sm">
              Most Popular
            </div>
            <div>
              <div className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-200">
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d1fae5_0%,#10b981_50%,#d1fae5_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#064e3b_0%,#059669_50%,#064e3b_100%)] opacity-80" />
                <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10">GROWTH</span>
                </span>
              </div>
              <div className="flex items-baseline mt-4 mb-6">
                <span className="text-2xl font-sans font-light tracking-tighter text-neutral-500 dark:text-neutral-400 mr-0.5">$</span>
                <span className="text-5xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">[0x1D]</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans ml-2">/ [UNIT_TOKEN]</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-6">[CORRUPTED_DESC_0xC2] [BLOB_ERR] [CIPHER_NULL_0x9F]</p>
              
              <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span className="font-semibold text-neutral-900 dark:text-zinc-200">[REDACTED_DISPATCH_0xFF] [TOKEN_VOID]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[SCRAMBLED_GEO_0x12] [GARBLED_ANALYTICS]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[CORRUPTED_CLICK_0x3A] [BLOB_REDIRECT]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[REDACTED_API_0x7B] [GARBLED_WEBHOOK]</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="w-full py-2.5 bg-neutral-900 dark:bg-neutral-850 text-white text-xs font-semibold rounded-lg transition-colors border border-neutral-950 dark:border-neutral-750 shadow-sm cursor-pointer"
            >
              Join Growth Tier
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/80 rounded-xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div>
              <div className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-md font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-200">
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fef3c7_0%,#f59e0b_50%,#fef3c7_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#451a03_0%,#d97706_50%,#451a03_100%)] opacity-80" />
                <span className="relative z-10 flex items-center px-2.5 py-1 rounded-md bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10">ENTERPRISE</span>
                </span>
              </div>
              <div className="flex items-baseline mt-4 mb-6">
                <span className="text-2xl font-sans font-light tracking-tighter text-neutral-400 dark:text-neutral-500 mr-0.5">$</span>
                <span className="text-5xl font-sans font-light tracking-tighter text-neutral-900 dark:text-white subpixel-antialiased">[0x95]</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans ml-2">/ [UNIT_TOKEN]</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-6">[SCRAMBLED_ENT_0xFE] [CORRUPTED_PLATFORM_BLOB] [CIPHER_0x4D]</p>
              
              <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-8 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[CORRUPTED_DOMAIN_0xC2] [GARBLED_MASK]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[REDACTED_SSO_0xD1] [SCRAMBLED_AUTH]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[CORRUPTED_LABEL_0xE4] [BLOB_SERVER_NULL]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                  <span>[SCRAMBLED_SLA_0x7B] [GARBLED_HOOK_0x9F]</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="w-full py-2.5 bg-neutral-100 dark:bg-neutral-800/60 text-neutral-800 dark:text-white text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700/50 shadow-sm cursor-pointer"
            >
              Contact Sales Office
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
