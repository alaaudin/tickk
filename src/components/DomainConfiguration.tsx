import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Server, Check, Copy, RefreshCw, Shield, AlertCircle } from "lucide-react";
import { supabase } from "../supabaseClient";

const API_BASE = import.meta.env.VITE_API_URL || "https://tickk-backend.onrender.com";

export default function DomainConfiguration() {
  const [domain, setDomain] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [dnsRecords, setDnsRecords] = useState<{type: string, name: string, value: string}[]>([]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim().length > 3 && domain.includes('.')) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        const response = await fetch(`${API_BASE}/api/domains/add`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ domain_name: domain })
        });
        if (response.ok) {
          const resData = await response.json();
          const instr = resData.instructions;
          setDnsRecords([
            { type: "TXT", name: "@", value: "v=spf1 include:relay.tickk.io ~all" },
            { type: "TXT", name: instr?.txt?.name || "tk._domainkey", value: instr?.txt?.target || "k=rsa; p=..." },
            { type: "CNAME", name: instr?.cname?.name || "tracking", value: instr?.cname?.target || "nodes.tickk.io" }
          ]);
          setIsRegistered(true);
        } else {
          console.error("Failed to provision domain");
        }
      } catch (error) {
        console.error("Error provisioning domain:", error);
      }
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const response = await fetch(`${API_BASE}/api/domains/verify`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ domain_name: domain })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.verified) {
          setIsVerified(true);
        }
      } else {
        console.error("Verification failed");
      }
    } catch (error) {
      console.error("Error verifying domain:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-12 animate-fadeIn max-w-3xl">
      <div>
        <h3 className="text-2xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">
          Domain Configuration
        </h3>
        <p className="text-xs text-neutral-500 dark:text-zinc-400">
          Provision custom sending domains and establish cryptographic trust ledgers.
        </p>
      </div>

      <div className="bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden relative">
        
        {/* Standard Blur Overlay */}
        <div className="absolute inset-0 z-50 backdrop-blur-xl bg-black/40 flex items-center justify-center overflow-hidden rounded-[inherit] select-none">
          <h3 className="text-xl sm:text-2xl font-light font-display text-white tracking-tight">
            Coming in the next version
          </h3>
        </div>

        {/* Glassmorphic Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-900/20 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

        <div className="p-8 relative z-10">
          <AnimatePresence mode="wait">
            {!isRegistered ? (
              <motion.form 
                key="register"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleRegister}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white tracking-wide">Register Custom Domain</h4>
                    <p className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">Initialize Sending Infrastructure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Target Domain</label>
                    <input 
                      type="text" 
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="e.g. outbound.yourdomain.com"
                      className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all font-mono"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={!(domain.trim().length > 3 && domain.includes('.'))}
                    className="w-full bg-zinc-100 hover:bg-white text-zinc-900 font-medium py-3 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Server className="w-4 h-4" />
                    Provision Domain
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="verify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, staggerChildren: 0.1 }}
                className="space-y-8"
              >
                <div className="flex items-start justify-between border-b border-zinc-800/60 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-900/20 border border-emerald-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white tracking-wide">{domain}</h4>
                      <p className="text-[11px] text-emerald-500/70 font-mono tracking-widest uppercase mt-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Provisioned
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isVerified ? (
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-medium text-emerald-400 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <Check className="w-3 h-3" /> VERIFIED
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-full bg-red-950/30 border border-red-900/50 text-[10px] font-mono font-medium text-red-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" /> UNVERIFIED
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[11px] font-bold font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                    <span>DNS Ledger Verification</span>
                    <span className="font-normal text-zinc-600">Pending Propagation</span>
                  </h5>
                  
                  <div className="grid gap-3">
                    {dnsRecords.map((record, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="bg-zinc-950/40 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700/50 transition-colors group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                              {record.type}
                            </span>
                            <span className="text-xs font-mono text-zinc-300">{record.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {isVerified ? (
                              <span className="text-[10px] font-mono font-medium text-emerald-400 flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                ✓ VERIFIED
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono font-medium text-red-400/90 flex items-center gap-1 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40">
                                ✗ UNVERIFIED
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-black/40 border border-zinc-800/50 rounded-lg p-2.5">
                          <code className="text-xs text-zinc-400 font-mono truncate mr-4">
                            {record.value}
                          </code>
                          <button 
                            onClick={() => handleCopy(record.value, idx)}
                            className="shrink-0 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleVerify}
                  disabled={isVerifying || isVerified}
                  className={`w-full font-medium py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 ${
                    isVerified 
                      ? "bg-zinc-900 text-zinc-500 cursor-default border border-zinc-800" 
                      : "bg-white hover:bg-zinc-200 text-black disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  {isVerifying ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : isVerified ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isVerifying ? "Querying Root Servers..." : isVerified ? "Verification Complete" : "Verify DNS Records"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
