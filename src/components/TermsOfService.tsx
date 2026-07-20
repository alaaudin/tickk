import React from "react";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export default function TermsOfService() {
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
              <ShieldAlert className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                Legal Notice & Compliance
              </span>
              <h1 className="text-3xl font-bold font-mono tracking-wide text-slate-900 mt-1">
                Terms of Infrastructure Use
              </h1>
            </div>
          </div>

          <article className="max-w-none space-y-10">
            <section className="space-y-4">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
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
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                I. Permitted Operational Scope
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
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
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                II. Prohibited Deployments
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
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
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                III. SLA & Infrastructure Volatility
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
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
              <h2 className="text-lg text-slate-900 font-bold font-mono tracking-wide uppercase border-l-2 border-slate-300 pl-4">
                IV. Sovereign Modifications
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-sans">
                We reserve the unilateral right to amend, augment, or recalibrate
                these Terms at our absolute discretion, ensuring alignment with
                evolving cyber-regulatory frameworks. Continued utilization of the
                Tickk nodes following the deployment of such amendments signifies
                your incontrovertible consent to the revised protocols.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-200/50">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest text-center">
                Protocol enacted: July 14, 2026. Document ID: TK-TOS-10V
              </p>
            </section>
          </article>
        </motion.div>
      </main>
    </div>
  );
}
