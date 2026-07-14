import re

with open('src/components/Dashboard.tsx', 'r') as f:
    d_content = f.read()

# Make sure Integration Hub says PREMIUM
d_content = d_content.replace('>Premium</span>', '>PREMIUM</span>')

# Add PREMIUM badge to Pricing & Plans
pricing_heading = '<h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">Pricing & Plans</h2>'
pricing_heading_new = '<h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight mb-2">Pricing & Plans <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 align-middle inline-block transform -translate-y-1">PREMIUM</span></h2>'
d_content = d_content.replace(pricing_heading, pricing_heading_new)

# Add PREMIUM badge to Corporate Billing
billing_heading = '<h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Corporate Billing & Allocations</h2>'
billing_heading_new = '<h2 className="text-3xl font-light font-display text-neutral-900 dark:text-white tracking-tight">Corporate Billing & Allocations <span className="px-2 py-0.5 ml-2 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 align-middle inline-block transform -translate-y-1">PREMIUM</span></h2>'
d_content = d_content.replace(billing_heading, billing_heading_new)

# Modify the Disconnect / Connect buttons in Mail Hub
old_btn = "<button onClick={() => toast(integ.active ? 'Provider Disconnected' : 'Provider Connected', 'success')} className={`mt-6 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer ${integ.active ? 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm'}`}>"
new_btn = "<button onClick={() => toast(integ.active ? 'Provider Disconnected' : 'Provider Connected', 'success')} className={`mt-6 w-full py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer ${integ.active ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm'}`}>"
d_content = d_content.replace(old_btn, new_btn)

old_btn_text = "{integ.active ? 'Disconnect' : 'Connect Account'}"
new_btn_text = "{integ.active ? 'DISCONNECT' : 'CONNECT'}"
d_content = d_content.replace(old_btn_text, new_btn_text)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(d_content)

