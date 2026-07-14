import re

with open('src/components/Dashboard.tsx', 'r') as f:
    d_content = f.read()

# Remove from Link Click Wrapping
d_content = d_content.replace('<span className="bg-neutral-200 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono">PREMIUM</span>', '')

# Restore on Pricing & Plans View (Dashboard.tsx)
d_content = d_content.replace('<h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Tickk Beta Pricing</h2>', '<h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Tickk Beta Pricing <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm align-middle inline-block transform -translate-y-1">PREMIUM</span></h2>')

# Restore on Pricing & Plans Sidebar (Dashboard.tsx)
d_content = d_content.replace('{ id: "pricing", label: "Pricing & Plans", icon: <Sparkles className="w-4 h-4" /> },', '{ id: "pricing", label: "Pricing & Plans (Premium)", icon: <Sparkles className="w-4 h-4" /> },')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(d_content)

with open('src/components/LandingPage.tsx', 'r') as f:
    l_content = f.read()

# Restore on Pricing Tiers (LandingPage.tsx)
l_content = l_content.replace('PRICING TIERS</span>', 'PRICING TIERS <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm align-middle">PREMIUM</span></span>')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(l_content)
