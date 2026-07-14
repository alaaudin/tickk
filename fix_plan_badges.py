import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace renderPlanBadge
old_render = """const renderPlanBadge = (plan: string) => (
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

new_render = """const renderPlanBadge = (plan: string) => {
  if (plan === "Telemetry Starter") {
    return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-zinc-200 to-zinc-400 text-zinc-900 shadow-sm">{plan}</span>;
  }
  if (plan === "Growth Core Access") {
    return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-emerald-200 to-emerald-400 text-emerald-900 shadow-sm">{plan}</span>;
  }
  if (plan === "Quantum Sentinel") {
    return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm">{plan}</span>;
  }
  return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-neutral-200 text-neutral-900 shadow-sm">{plan}</span>;
};"""
content = content.replace(old_render, new_render)

# Replace the names in the pricing cards
old_t1 = '<h4 className="text-lg font-medium font-display text-neutral-900 dark:text-white mt-1 flex items-center gap-2">Telemetry Starter <BadgeCheck className="w-5 h-5 text-white dark:text-[#050506] fill-zinc-400" /></h4>'
new_t1 = '<div className="mt-1">{renderPlanBadge("Telemetry Starter")}</div>'
content = content.replace(old_t1, new_t1)

old_t2 = '<h4 className="text-lg font-semibold font-display text-neutral-900 dark:text-white mt-1 flex items-center gap-2">Growth Core Access <BadgeCheck className="w-5 h-5 text-white dark:text-[#050506] fill-emerald-500" /></h4>'
new_t2 = '<div className="mt-1">{renderPlanBadge("Growth Core Access")}</div>'
content = content.replace(old_t2, new_t2)

old_t3 = '<h4 className="text-lg font-medium font-display text-neutral-900 dark:text-white mt-1 flex items-center gap-2">Quantum Sentinel <BadgeCheck className="w-5 h-5 text-white dark:text-[#050506] fill-amber-400" /></h4>'
new_t3 = '<div className="mt-1">{renderPlanBadge("Quantum Sentinel")}</div>'
content = content.replace(old_t3, new_t3)


with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
