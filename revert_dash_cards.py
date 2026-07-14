import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Revert Dashboard Cards
c1 = 'className={`flex flex-col justify-between p-6 bg-gradient-to-b from-white/40 to-emerald-50/20 dark:from-zinc-900/40 dark:to-emerald-900/10 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] rounded-2xl relative overflow-hidden group transition-all`}'
r1 = 'className={`flex flex-col justify-between p-6 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden group`}'
content = content.replace(c1, r1)

c2 = 'className={`flex flex-col justify-between p-6 bg-gradient-to-b from-neutral-100/90 to-amber-50/30 dark:from-[#13110d] dark:to-[#0d0b08] border-2 border-amber-500/60 shadow-[0_0_25px_rgba(251,191,36,0.15)] dark:shadow-[0_0_25px_rgba(251,191,36,0.1)] rounded-2xl relative overflow-hidden group scale-[1.02] z-10 transition-all`}'
r2 = 'className={`flex flex-col justify-between p-6 bg-gradient-to-b from-neutral-100/90 to-neutral-200/40 dark:from-[#111113] dark:to-[#08080a] border-2 border-neutral-800 dark:border-zinc-700 shadow-xl rounded-2xl relative overflow-hidden group scale-[1.02] z-10`}'
content = content.replace(c2, r2)

c3 = 'className={`flex flex-col justify-between p-6 bg-gradient-to-b from-white/40 to-blue-50/20 dark:from-zinc-900/40 dark:to-blue-900/10 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] rounded-2xl relative overflow-hidden group transition-all`}'
r3 = 'className={`flex flex-col justify-between p-6 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden group`}'
content = content.replace(c3, r3)

# Add renderPlanBadge and fix renderNameWithBadge
old_render_name = """const renderNameWithBadge = (name: string, plan: string) => (
  <span className="inline-flex items-center gap-1.5">
    {name}
    {plan === "Telemetry Starter" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
    )}
    {plan === "Growth Core Access" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
    )}
    {plan === "Quantum Sentinel" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
    )}
  </span>
);"""

new_render_name = """const renderNameWithBadge = (name: string, plan: string) => (
  <span className="inline-flex items-center gap-1.5">
    {name}
    {plan === "Telemetry Starter" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-zinc-400" />
    )}
    {plan === "Growth Core Access" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-emerald-500" />
    )}
    {plan === "Quantum Sentinel" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-amber-400" />
    )}
  </span>
);

export const renderPlanBadge = (plan: string) => (
  <span className="inline-flex items-center gap-1.5 font-bold text-neutral-950 dark:text-white">
    {plan}
    {plan === "Telemetry Starter" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-zinc-400" />
    )}
    {plan === "Growth Core Access" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-emerald-500" />
    )}
    {plan === "Quantum Sentinel" && (
      <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-amber-400" />
    )}
  </span>
);"""
content = content.replace(old_render_name, new_render_name)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
