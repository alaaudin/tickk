import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-3xl bg-[#0B0F19]/90 border border-white/[0.08] rounded-xl shadow-2xl p-10 space-y-6 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        
        <h1 className="text-3xl font-bold text-white mb-8">Terms of Service - Tickk</h1>
        
        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-mono tracking-wider uppercase text-white border-b border-white/[0.05] pb-2 mb-4">I. ACCEPTANCE OF INFRASTRUCTURE TERMS</h2>
            <p>By accessing the Tickk beta platform, you agree to these Terms of Service. This service is provided for telemetry evaluation and monitoring. Users must comply with all applicable local and international communication laws.</p>
          </section>

          <section>
            <h2 className="font-mono tracking-wider uppercase text-white border-b border-white/[0.05] pb-2 mb-4">II. ACCEPTABLE USE MANDATES</h2>
            <p>Tickk reserves the right to terminate accounts that violate our acceptable use guidelines, including sending malicious payloads, spam networks, or conducting unauthorized stress testing against our telemetry endpoints.</p>
          </section>

          <section>
            <h2 className="font-mono tracking-wider uppercase text-white border-b border-white/[0.05] pb-2 mb-4">III. LIABILITY & BETA PROVISIONING</h2>
            <p>The platform is provided "as is" without warranty during the beta phase. We are not liable for any service interruptions, data synchronization delays, or false-positive telemetry readouts while infrastructure is actively scaling.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
