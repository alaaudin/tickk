import re

with open('src/components/LandingPage.tsx', 'r') as f:
    l_content = f.read()

pricing_title = '<span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">PRICING TIERS</span>'
pricing_title_new = '<span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase flex items-center justify-center gap-2">PRICING TIERS <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm align-middle">PREMIUM</span></span>'

l_content = l_content.replace(pricing_title, pricing_title_new)

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(l_content)
