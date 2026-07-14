import React, { useState } from "react";
import { Smartphone, BellRing, ShieldCheck, RefreshCw, QrCode, Monitor, Laptop } from "lucide-react";

interface MobileSettingsPanelProps {
  toast: (message: string, type: "success" | "error" | "info") => void;
}

export default function MobileSettingsPanel({ toast }: MobileSettingsPanelProps) {
  const [pushOpens, setPushOpens] = useState(true);
  const [pushClicks, setPushClicks] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState("tickk_mob_98a72cf100ab78f2302e");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast("Mobile configuration saved successfully", "success");
    }, 800);
  };

  const handleRotateToken = () => {
    const chars = "abcdef0123456789";
    let newToken = "tickk_mob_";
    for (let i = 0; i < 20; i++) {
      newToken += chars[Math.floor(Math.random() * chars.length)];
    }
    setToken(newToken);
    toast("Companion App pairing token rotated successfully", "info");
  };

  return (
    <div className="space-y-12 animate-fadeIn max-w-3xl pb-12">
      <div>
        <h3 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">
          Mobile App & Companion Sync
        </h3>
        <p className="text-xs text-neutral-500 dark:text-zinc-400">
          Pair physical mobile devices to receive real-time push telemetry, rotate workspace access tokens, and enforce client-side biometrics.
        </p>
      </div>

      {/* Pairing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code Container */}
        <div className="border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50/50 dark:bg-zinc-900/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-40 h-40 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-sm mb-4 flex items-center justify-center relative overflow-hidden group">
            <QrCode className="w-full h-full text-neutral-900 dark:text-zinc-200" strokeWidth={1.5} />
            {/* Subtle glow lines for futuristic tech look */}
            <div className="absolute inset-x-0 h-[2px] bg-neutral-500/20 top-0 animate-bounce" />
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-zinc-500 mb-1">
            Secure Pairing Signature
          </span>
          <p className="text-xs text-neutral-600 dark:text-zinc-400 font-sans max-w-xs leading-relaxed">
            Scan using the Tickk Mobile App (iOS & Android) to instantly link this enterprise workspace and synchronize live triggers.
          </p>
        </div>

        {/* Pairing Tokens Container */}
        <div className="border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50/50 dark:bg-zinc-900/10 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h5 className="text-sm font-semibold text-neutral-900 dark:text-white font-display">
              Companion Pairing Token
            </h5>
            <p className="text-xs text-neutral-500 dark:text-zinc-500 leading-relaxed font-sans">
              If QR scanning fails, use this temporary pairing hash to link your companion terminal manually.
            </p>
            <div className="bg-neutral-100 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-900 rounded-xl px-4 py-3.5 font-mono text-xs text-neutral-800 dark:text-zinc-300 break-all flex items-center justify-between gap-3 select-all">
              <span>{token}</span>
            </div>
          </div>
          <button
            onClick={handleRotateToken}
            className="mt-6 flex items-center justify-center gap-2 border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-900/40 text-xs font-semibold px-4 py-2.5 rounded-xl text-neutral-800 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Rotate Companion Token
          </button>
        </div>
      </div>

      {/* Push controls */}
      <div className="space-y-6">
        <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest">
          Mobile Push Notifications
        </h4>

        {/* Push for Opens */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <BellRing className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                Email Opens Push Alerts
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Dispatch an immediate background push alert on your paired companion device the millisecond a recipient loads a tracking pixel.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={pushOpens}
              onChange={() => setPushOpens(!pushOpens)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                pushOpens 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setPushOpens(!pushOpens)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                pushOpens ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>

        {/* Push for Clicks */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <BellRing className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                Link Clicks Push Alerts
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Dispatch high-priority push notifications detailing direct link redirection and click telemetry counts.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={pushClicks}
              onChange={() => setPushClicks(!pushClicks)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                pushClicks 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setPushClicks(!pushClicks)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                pushClicks ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>
      </div>

      {/* Biometrics */}
      <div className="space-y-6 pt-4">
        <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest">
          Mobile App Security
        </h4>

        {/* Biometrics Toggle */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <ShieldCheck className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                Require Biometric Lock (FaceID / TouchID)
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Force biometric authentication immediately on launching the companion application to prevent unauthorized device access.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={biometric}
              onChange={() => setBiometric(!biometric)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                biometric 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setBiometric(!biometric)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                biometric ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>
      </div>

      {/* Paired Terminals */}
      <div className="space-y-6 pt-4">
        <div>
          <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 mb-4 uppercase tracking-widest">
            Paired Companion Terminals
          </h4>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between p-4 border border-neutral-200/80 dark:border-zinc-800 rounded-xl bg-white dark:bg-black/10">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white font-display">Saqib Memon's iPhone 15 Pro</p>
                <p className="text-[10px] font-mono text-zinc-500">PAIRED: 2 days ago • IP: 182.180.122.9 • iOS 17.5.1</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded">
              ONLINE
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-neutral-200/80 dark:border-zinc-800 rounded-xl bg-white dark:bg-black/10">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white font-display">Samsung Galaxy S24 Ultra</p>
                <p className="text-[10px] font-mono text-zinc-500">PAIRED: 1 week ago • IP: 110.34.20.144 • Android 14</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-bold font-mono bg-neutral-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-800 rounded">
              OFFLINE
            </span>
          </div>
        </div>
      </div>

      {/* Action panel */}
      <div className="pt-6 border-t border-neutral-100 dark:border-zinc-800 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-neutral-900 dark:bg-zinc-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-display tracking-wide whitespace-nowrap cursor-pointer flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving Changes...
            </>
          ) : (
            "Save Mobile Settings"
          )}
        </button>
      </div>
    </div>
  );
}
