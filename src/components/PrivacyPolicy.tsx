import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-3xl bg-[#0B0F19]/90 border border-white/[0.08] rounded-xl shadow-2xl p-10 space-y-6 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy - Tickk</h1>
        
        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-mono tracking-wider uppercase text-white border-b border-white/[0.05] pb-2 mb-4">I. TELEMETRY ACQUISITION VECTORS</h2>
            <p>This Data Privacy Protocol dictates the collection, processing, and safeguarding of telemetry data across the Tickk infrastructure. We ensure strict compliance with global cyber telemetry mandates and absolute data encryption.</p>
          </section>

          <section>
            <h2 className="font-mono tracking-wider uppercase text-white border-b border-white/[0.05] pb-2 mb-4">II. CRYPTOGRAPHIC PRESERVATION</h2>
            <p>Tickk infrastructure exclusively processes deterministic signaling data intrinsic to the evaluation of outbound digital correspondence, without examining the semantic contents of your communications. All transient data streams are protected by AES-256 encryption at rest and TLS 1.3 in transit.</p>
          </section>

          <section>
            <h2 className="font-mono tracking-wider uppercase text-white border-b border-white/[0.05] pb-2 mb-4">III. THIRD-PARTY DATA ISOLATION</h2>
            <p>Under no circumstances does Tickk monetize, distribute, or broker core telemetry data to unauthorized third-party vendors. System logs are isolated strictly for the purpose of improving service integrity and user diagnostics.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
