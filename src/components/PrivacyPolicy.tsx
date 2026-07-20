import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#0B0F19] text-neutral-200 min-h-screen flex flex-col font-sans relative overflow-hidden">
      
      {/* Ambient background blobs matching Landing Page */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[140px] sm:blur-[200px] mix-blend-screen opacity-[0.07] animate-blob-slow bg-white top-[-8%] left-[-8%]" />
        <div className="absolute w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] rounded-full blur-[150px] sm:blur-[220px] mix-blend-screen opacity-[0.06] animate-blob-slow-reverse bg-neutral-100 bottom-[-12%] right-[-8%]" />
        <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[120px] sm:blur-[180px] mix-blend-screen opacity-[0.05] animate-blob-slow bg-zinc-200 top-[30%] left-[50%] -translate-x-1/2" />
      </div>

      <header className="sticky top-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#1e1e22] px-6 lg:px-16 py-4 flex items-center justify-between relative z-10">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium hover:text-white text-neutral-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Hub
        </a>
        <span className="flex items-center gap-2 select-none">
          <img src="/logo.svg" alt="Tickk" className="h-4 invert" />
        </span>
        <div className="w-24" /> {/* Spacer */}
      </header>

      <main className="relative z-10 max-w-4xl mx-auto w-full px-6 lg:px-16 py-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white text-slate-800 w-full max-w-3xl rounded-xl p-10 shadow-2xl border border-slate-200/50 space-y-6 mx-auto relative z-10"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200/50 pb-6">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                Legal Notice & Compliance
              </span>
              <h1 className="text-3xl font-bold font-mono tracking-wide text-slate-900 mt-1">
                Data Privacy Protocol
              </h1>
            </div>
          </div>

          <article className="max-w-none space-y-10">
            <section className="space-y-4">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
                This Data Privacy Protocol ("Protocol") dictates the collection,
                processing, and safeguarding of telemetry data across the Tickk
                infrastructure. As an organization facilitating executive-tier
                communication intelligence, we acknowledge the profound
                responsibility of managing metadata streams and navigational
                waypoints. Our commitment to absolute data sovereignty remains
                unyielding, governed by rigorous cryptographic frameworks and
                strict compliance with global cyber telemetry mandates.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                I. Telemetry Acquisition Vectors
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
                Tickk’s infrastructure exclusively processes deterministic
                signaling data intrinsic to the evaluation of outbound digital
                correspondence. This includes, but is not restricted to:
                cryptographic tracking payload executions, IP geolocation matrices,
                user-agent environment topologies, and temporal engagement markers.
                We deliberately abstain from examining, harvesting, or indexing the
                semantic contents, attachments, or subjective context of your
                communications. Our proprietary Node Cluster is structurally blind
                to payload content, operating purely on metadata logistics.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                II. Cryptographic Preservation
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
                All transient data streams and dormant metadata architectures are
                subject to comprehensive AES-256 encryption at rest and TLS 1.3
                protocols in transit. Access to granular session histories is
                partitioned through role-based access control (RBAC) matrices,
                ensuring that systemic vulnerability is anatomically impossible.
                Tickk deploys automated obfuscation algorithms to sanitize IP
                geolocations from secondary external logs, ensuring ultimate
                recipient ambiguity outside the authenticated client console.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                III. Sovereign Jurisdictions
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
                Client metadata is routed, compiled, and anchored in highly
                fortified, geographically compliant server enclaves. We maintain
                absolute adherence to the General Data Protection Regulation
                (GDPR), the California Consumer Privacy Act (CCPA), and analogous
                international privacy decrees. We do not—and categorically will
                not—sublease, barter, or distribute your telemetry archives to
                ancillary marketing syndicates, foreign intelligence apparatuses,
                or unauthorized third-party brokerages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                IV. The Right to Erasure
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
                In alignment with contemporary digital rights legislation, any
                registered administrator retains the unequivocal authority to
                initiate a total volumetric purge of their respective workspace
                cache. Upon the issuance of a verified deletion directive, our
                infrastructure systematically annihilates the specified telemetry
                records across primary nodes and redundant storage arrays within
                seventy-two (72) hours, leaving no latent signatures or orphaned
                logs.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-200/50">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest text-center">
                Protocol enacted: July 14, 2026. Document ID: TK-PRV-99A
              </p>
            </section>
          </article>
        </motion.div>
      </main>
    </div>
  );
}
