import React from "react";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface TermsOfServiceProps {
  onBack: () => void;
  theme: "light" | "dark";
}

export default function TermsOfService({ onBack, theme }: TermsOfServiceProps) {
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
              <ShieldAlert className="w-5 h-5 transition-colors duration-300 text-slate-700 dark:text-zinc-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 text-slate-500 dark:text-zinc-500">
                Legal Notice & Compliance
              </span>
              <h1 className="text-3xl font-bold font-mono tracking-wide mt-1 transition-colors duration-300 text-slate-900 dark:text-white">
                Terms of Infrastructure Use
              </h1>
            </div>
          </div>

          <article className="max-w-none space-y-10">
            <section className="space-y-4">
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
                This document constitutes a binding operational covenant ("Terms")
                between you (the "Operator") and Tickk ("the Infrastructure"). By
                provisioning an account, mobilizing a tracking pixel, or routing
                telemetry through our proxy nodes, you acknowledge complete
                understanding and unconditional acceptance of these stipulations.
                These Terms are constructed to shield the integrity of our digital
                apparatus and govern the parameters of acceptable telemetry
                acquisition.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                I. Permitted Operational Scope
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
                The Tickk Infrastructure is strictly engineered for lawful,
                transparent, and professional communication auditing. Operators are
                granted a non-exclusive, revocable license to deploy our
                telemetry nodes for the sole purpose of evaluating authorized
                outbound transmissions. You represent and warrant that you possess
                all requisite permissions to engage in the monitoring of the
                respective recipients, in full accordance with the sovereign laws
                of their domicile.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                II. Prohibited Deployments
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
                Any utilization of the Infrastructure to execute malicious
                payloads, facilitate phishing syndicates, deploy unsolicited mass
                transmissions (SPAM), or circumvent digital security perimeters is
                categorically forbidden. The deployment of Tickk's tracking pixels
                within compromised environments, illegal solicitations, or
                communications intended to harass, extort, or deceive recipients
                will trigger an immediate, irreversible termination of your Node
                Cluster routing capabilities.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                III. SLA & Infrastructure Volatility
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
                While we employ sophisticated redundancies to ensure continuous
                operational stability, the Tickk proxy relays and dashboard
                consoles are provided on an "AS IS" and "AS AVAILABLE" basis. We
                expressly disclaim any warranties, explicit or implied, regarding
                uninterrupted uptime, zero-latency deliveries, or absolute error
                immunity. We accept no liability for collateral damages, strategic
                setbacks, or revenue diminishment arising from transient anomalies
                within the routing network.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase border-l-2 pl-4 transition-colors duration-300 text-slate-900 border-slate-300 dark:text-zinc-200 dark:border-zinc-700">
                IV. Sovereign Modifications
              </h2>
              <p className="leading-relaxed text-sm sm:text-base font-sans transition-colors duration-300 text-slate-700 dark:text-zinc-400">
                We reserve the unilateral right to amend, augment, or recalibrate
                these Terms at our absolute discretion, ensuring alignment with
                evolving cyber-regulatory frameworks. Continued utilization of the
                Tickk nodes following the deployment of such amendments signifies
                your incontrovertible consent to the revised protocols.
              </p>
            </section>

            <section className="pt-8 border-t transition-colors duration-300 border-slate-200/50 dark:border-white/10">
              <p className="text-[11px] font-mono uppercase tracking-widest text-center transition-colors duration-300 text-slate-500 dark:text-zinc-600">
                Protocol enacted: July 14, 2026. Document ID: TK-TOS-10V
              </p>
            </section>
          </article>
        </motion.div>
      </main>
    </div>
  );
}
