import re

with open('src/components/Dashboard.tsx', 'r') as f:
    d_content = f.read()

# Remove PREMIUM badges
d_content = d_content.replace('Pricing & Plans <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 align-middle inline-block transform -translate-y-1">PREMIUM</span>', 'Pricing & Plans')
d_content = d_content.replace('Corporate Billing & Allocations <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 align-middle inline-block transform -translate-y-1">PREMIUM</span>', 'Corporate Billing & Allocations')
d_content = d_content.replace('Integration Hub <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900">PREMIUM</span>', 'Integration Hub')
d_content = d_content.replace('API Keys <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 align-middle inline-block transform -translate-y-1">PREMIUM</span>', 'API Keys')

# Remove glow from checkmarks
d_content = d_content.replace('drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] ', '')

# Fix copy check marks in Dashboard
d_content = d_content.replace('<Check className="w-3.5 h-3.5 text-emerald-500 dark:text-neutral-900 dark:text-white" />', '<Check className="w-3.5 h-3.5 text-emerald-500" />')
d_content = d_content.replace('{copiedHtmlCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}', '{copiedHtmlCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(d_content)

with open('src/components/LandingPage.tsx', 'r') as f:
    l_content = f.read()

# Remove PREMIUM badge from Pricing Tiers
l_content = l_content.replace('PRICING TIERS <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 shadow-sm align-middle">PREMIUM</span>', 'PRICING TIERS')

# Remove glow from checkmarks
l_content = l_content.replace('drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] ', '')

# Maybe fix other Check icons in LandingPage
l_content = l_content.replace('<Check className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />', '<Check className="w-3 h-3 text-emerald-500" />')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(l_content)
