import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

interface PrivacyPolicyProps {
  onBack: () => void;
  theme: "light" | "dark";
}

export default function PrivacyPolicy({ onBack, theme }: PrivacyPolicyProps) {
  return (
    <div className="bg-transparent text-[#111115] dark:text-neutral-200 min-h-screen flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#e5e5e5] dark:border-[#1e1e22] px-6 lg:px-16 py-4 flex items-center justify-between transition-colors duration-300">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Hub
        </button>
        <span className="flex items-center gap-2 select-none">
          <img src="/logo.svg" alt="Tickk" className="h-4 dark:invert" />
        </span>
        <div className="w-24" /> {/* Spacer */}
      </header>

      <main className="relative z-10 max-w-4xl mx-auto w-full px-6 lg:px-16 py-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl rounded-xl p-10 lg:p-16 shadow-2xl mx-auto relative z-10 transition-colors duration-300 bg-white border-slate-200/50 text-slate-800 border space-y-6 dark:bg-[#0B0F19]/80 dark:border-white/[0.08] dark:backdrop-blur-3xl dark:text-slate-300"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200/50 dark:border-white/10 pb-6 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-slate-50 border border-slate-200/50 dark:bg-white/5 dark:border-white/10">
              <Shield className="w-5 h-5 transition-colors duration-300 text-slate-700 dark:text-zinc-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 text-slate-500 dark:text-zinc-500">
                Legal Notice & Compliance
              </span>
              <h1 className="text-3xl font-bold font-mono tracking-wide mt-1 transition-colors duration-300 text-slate-900 dark:text-white">
                Data Privacy Protocol
              </h1>
            </div>
          </div>

          <article className="max-w-none space-y-10">
            <section className="space-y-4">
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
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
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                I. Telemetry Acquisition Vectors
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
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
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                II. Cryptographic Preservation
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
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
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                III. Sovereign Jurisdictions
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
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
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                IV. The Right to Erasure
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
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

            <section className="pt-8 border-t transition-colors duration-300 border-slate-200/50 dark:border-white/10">
              <p className="text-[11px] font-mono uppercase tracking-widest text-center transition-colors duration-300 text-slate-500 dark:text-zinc-600">
                Protocol enacted: July 14, 2026. Document ID: TK-PRV-99A
              </p>
            </section>
          </article>
        </motion.div>
      </main>
    </div>
  );
}
