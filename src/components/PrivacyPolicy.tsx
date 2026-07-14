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
          className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-3xl p-10 lg:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-colors duration-300"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-neutral-200 dark:border-white/10 pb-6 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center transition-colors duration-300">
              <Shield className="w-5 h-5 text-neutral-600 dark:text-zinc-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 dark:text-zinc-500 uppercase">
                Legal Notice & Compliance
              </span>
              <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-900 dark:text-white mt-1 transition-colors duration-300">
                Data Privacy Protocol
              </h1>
            </div>
          </div>

          <article className="max-w-none space-y-10">
            <section className="space-y-4">
              <p className="text-neutral-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300">
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
              <h2 className="text-lg font-medium text-neutral-900 dark:text-zinc-200 tracking-wide uppercase font-mono border-l-2 border-neutral-300 dark:border-zinc-700 pl-4 transition-colors duration-300">
                I. Telemetry Acquisition Vectors
              </h2>
              <p className="text-neutral-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300">
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
              <h2 className="text-lg font-medium text-neutral-900 dark:text-zinc-200 tracking-wide uppercase font-mono border-l-2 border-neutral-300 dark:border-zinc-700 pl-4 transition-colors duration-300">
                II. Cryptographic Preservation
              </h2>
              <p className="text-neutral-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300">
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
              <h2 className="text-lg font-medium text-neutral-900 dark:text-zinc-200 tracking-wide uppercase font-mono border-l-2 border-neutral-300 dark:border-zinc-700 pl-4 transition-colors duration-300">
                III. Sovereign Jurisdictions
              </h2>
              <p className="text-neutral-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300">
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
              <h2 className="text-lg font-medium text-neutral-900 dark:text-zinc-200 tracking-wide uppercase font-mono border-l-2 border-neutral-300 dark:border-zinc-700 pl-4 transition-colors duration-300">
                IV. The Right to Erasure
              </h2>
              <p className="text-neutral-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300">
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

            <section className="pt-8 border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
              <p className="text-[11px] font-mono text-neutral-500 dark:text-zinc-600 uppercase tracking-widest text-center transition-colors duration-300">
                Protocol enacted: July 14, 2026. Document ID: TK-PRV-99A
              </p>
            </section>
          </article>
        </motion.div>
      </main>
    </div>
  );
}
