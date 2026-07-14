import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { Shield, Lock, EyeOff, Calendar, UserCheck, Server, AlertTriangle } from "lucide-react";

interface PrivacySettingsPanelProps {
  toast: (message: string, type: "success" | "error" | "info") => void;
}

export default function PrivacySettingsPanel({ toast }: PrivacySettingsPanelProps) {
  const [ipAnonymize, setIpAnonymize] = useState(true);
  const [piiEncrypt, setPiiEncrypt] = useState(false);
  const [gdprFilter, setGdprFilter] = useState(true);
  const [mfaEnforce, setMfaEnforce] = useState(false);
  const [retention, setRetention] = useState("90");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast("Privacy & Security settings updated successfully", "success");
    }, 800);
  };

  return (
    <div className="space-y-12 animate-fadeIn max-w-3xl pb-12">
      <div>
        <h3 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">
          Privacy & Security
        </h3>
        <p className="text-xs text-neutral-500 dark:text-zinc-400">
          Enforce global data safety protocols, GDPR compliance, encryption standards, and record retention limits.
        </p>
      </div>

      {/* Compliance Advisory */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-400">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <p className="font-semibold">Compliance Active</p>
          <p className="leading-relaxed opacity-90">
            Modifying recipient privacy behaviors directly alters the telemetry payload signatures. Ensure changes align with your regional legal frameworks (GDPR, CAN-SPAM).
          </p>
        </div>
      </div>

      {/* Security controls */}
      <div className="space-y-6">
        <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest">
          Recipient Data Anonymization
        </h4>

        {/* IP Anonymization Toggle */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <Server className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                IP Address Masking (GDPR-ready)
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Truncate the last octet of recipient IP addresses (e.g. 192.168.1.XXX) prior to geographic database querying.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={ipAnonymize}
              onChange={() => setIpAnonymize(!ipAnonymize)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                ipAnonymize 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setIpAnonymize(!ipAnonymize)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                ipAnonymize ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>

        {/* PII Encryption Toggle */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <EyeOff className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                Cryptographic Recipient Hashing
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Encrypt recipient names and email addresses using SHA-256. Tracking logs will display secure hash handles.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={piiEncrypt}
              onChange={() => setPiiEncrypt(!piiEncrypt)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                piiEncrypt 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setPiiEncrypt(!piiEncrypt)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                piiEncrypt ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>
      </div>

      {/* Regional Compliance & Multi-Factor */}
      <div className="space-y-6 pt-4">
        <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 uppercase tracking-widest">
          Regional Policies & Security Enforcement
        </h4>

        {/* EU Geolocation Guard */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <UserCheck className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                EU Recipient Geolocation Guard
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Decline resolution of fine-grained geolocation coordinates for IP ranges resolved within European Union jurisdictions.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={gdprFilter}
              onChange={() => setGdprFilter(!gdprFilter)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                gdprFilter 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setGdprFilter(!gdprFilter)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                gdprFilter ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>

        {/* MFA for Telemetry Downloads */}
        <div className="flex items-start justify-between p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900/30 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-zinc-800">
          <div className="space-y-1 flex gap-3.5 items-start pr-4">
            <Lock className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
            <div>
              <div className="text-sm font-medium font-display text-neutral-900 dark:text-white">
                Enforce Verification for Telemetry Exports
              </div>
              <div className="text-xs text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
                Prompt for password authentication or MFA verification codes when exporting corporate workspace logs or generating CSV reports.
              </div>
            </div>
          </div>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              checked={mfaEnforce}
              onChange={() => setMfaEnforce(!mfaEnforce)}
              className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-[3px] appearance-none cursor-pointer transform transition-transform ${
                mfaEnforce 
                  ? "translate-x-5 border-neutral-900 dark:border-white" 
                  : "translate-x-0 border-neutral-300 dark:border-zinc-600"
              }`}
            />
            <label 
              onClick={() => setMfaEnforce(!mfaEnforce)}
              className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${
                mfaEnforce ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-zinc-600"
              }`} 
            />
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="space-y-6 pt-4">
        <div>
          <h4 className="text-[11px] font-bold font-mono text-neutral-900 dark:text-zinc-300 border-b border-neutral-100 dark:border-zinc-800/60 pb-2 mb-4 uppercase tracking-widest">
            Data Retention Manifesto
          </h4>
          <p className="text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed mb-6 font-sans">
            Automatically purge historical email tracker telemetry from Tickk servers after the designated period. Shorter retention cycles improve overall workspace security and recipient trust.
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-[11px] font-semibold text-neutral-700 dark:text-zinc-300 font-sans flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            Retention Policy Period
          </label>
          <div className="relative max-w-sm">
            <select
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-zinc-800 text-sm rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-zinc-400 transition-colors font-sans appearance-none cursor-pointer"
            >
              <option value="30">30 Days (Compliant Clean)</option>
              <option value="90">90 Days (Enterprise Default)</option>
              <option value="180">180 Days (Extended Review)</option>
              <option value="365">365 Days (Full Cycle Archive)</option>
              <option value="0">Indefinite (Unlimited Storage)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
            "Save Privacy Settings"
          )}
        </button>
      </div>
    </div>
  );
}
