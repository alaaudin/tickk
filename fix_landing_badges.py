import re

with open('src/components/LandingPage.tsx', 'r') as f:
    content = f.read()

old_s = '<span className="text-[11px] font-display font-semibold tracking-[0.22em] text-neutral-400 dark:text-neutral-500 uppercase flex items-center gap-2">STARTER <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-zinc-400" /></span>'
new_s = '<span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-zinc-200 to-zinc-400 text-zinc-900 shadow-sm inline-block">STARTER</span>'
content = content.replace(old_s, new_s)

old_g = '<span className="text-[11px] font-display font-semibold tracking-[0.22em] text-neutral-800 dark:text-white uppercase flex items-center gap-2">GROWTH <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-emerald-500" /></span>'
new_g = '<span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-emerald-200 to-emerald-400 text-emerald-900 shadow-sm inline-block">GROWTH</span>'
content = content.replace(old_g, new_g)

old_e = '<span className="text-[11px] font-display font-semibold tracking-[0.22em] text-neutral-400 dark:text-neutral-500 uppercase flex items-center gap-2">ENTERPRISE <BadgeCheck className="w-4 h-4 text-white dark:text-[#050506] fill-amber-400" /></span>'
new_e = '<span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm inline-block">ENTERPRISE</span>'
content = content.replace(old_e, new_e)

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(content)
