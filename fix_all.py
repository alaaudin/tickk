import re

with open('src/components/Dashboard.tsx', 'r') as f:
    d_content = f.read()

# 1. Darker green badge
d_content = d_content.replace('from-emerald-200 to-emerald-400 text-emerald-900', 'from-emerald-400 to-emerald-600 text-emerald-950')

# 2. Check marks in Dashboard
d_content = d_content.replace('<Check className="w-3.5 h-3.5 text-neutral-600 dark:text-zinc-400 shrink-0" />', '<Check className="w-3.5 h-3.5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0 stroke-[3px]" />')
d_content = d_content.replace('<Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white shrink-0 stroke-[3px]" />', '<Check className="w-3.5 h-3.5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0 stroke-[3px]" />')

# 3. Mail Integration Hub updates
# Status Badge
old_badge = "`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${integ.active ? 'bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-neutral-900 dark:border-zinc-100' : 'bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800'}`"
new_badge = "`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded border ${integ.active ? 'bg-white/30 dark:bg-white/10 backdrop-blur-md text-emerald-700 dark:text-emerald-400 border-emerald-500/40 shadow-[0_4px_12px_rgba(16,185,129,0.2)]' : 'bg-neutral-50 dark:bg-zinc-900/50 text-neutral-500 border-neutral-200 dark:border-zinc-800'}`"
d_content = d_content.replace(old_badge, new_badge)

# Status text
old_status_text = "{integ.status}"
new_status_text = "{integ.active ? 'CONNECTED' : 'AVAILABLE'}"
# Be careful to only replace the one inside the badge span.
badge_block_old = f"""<span className={old_badge}>
                                      {old_status_text}
                                    </span>"""
badge_block_new = f"""<span className={new_badge}>
                                      {new_status_text}
                                    </span>"""
d_content = d_content.replace(badge_block_old, badge_block_new)

# Connect/Disconnect Button
old_btn = "<button onClick={() => toast(integ.active ? 'Provider Reconfigured' : 'Provider Connected', 'success')} className={`mt-6 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer ${integ.active ? 'bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 shadow-sm' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm'}`}>"
new_btn = "<button onClick={() => toast(integ.active ? 'Provider Disconnected' : 'Provider Connected', 'success')} className={`mt-6 w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer ${integ.active ? 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm'}`}>"
d_content = d_content.replace(old_btn, new_btn)

old_btn_text = "{integ.active ? 'Configure Integration' : 'Connect Account'}"
new_btn_text = "{integ.active ? 'Disconnect' : 'Connect Account'}"
d_content = d_content.replace(old_btn_text, new_btn_text)

# Remove Yahoo and Apple from Team Members
# We will use regex to find the Team Members block and remove everything from "                            {/* Yahoo Mail */}" up to just before the closing </div></div></div>
team_end_pattern = r'(\s*)\{/\* Yahoo Mail \*/\}.*?(?=\s*\{/\* OTHER PLACEHOLDERS)'
d_content = re.sub(team_end_pattern, r'\1</div>\n                          </div>\n                        </div>\n                      )}', d_content, flags=re.DOTALL)


with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(d_content)

with open('src/components/LandingPage.tsx', 'r') as f:
    l_content = f.read()

# 1. Darker green badge
l_content = l_content.replace('from-emerald-200 to-emerald-400 text-emerald-900', 'from-emerald-400 to-emerald-600 text-emerald-950')

# 2. Check marks in LandingPage
l_content = l_content.replace('<Check className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />', '<Check className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0 mt-0.5 stroke-[3px]" />')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(l_content)
